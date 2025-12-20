import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { addLead } from '@/lib/leads';

// Basic in-memory rate limiting
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

function errorResponse(message: string, status: number) {
    return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request: Request) {
    try {
        // 1. Rate Limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const requestCount = rateLimit.get(ip) || 0;

        if (requestCount >= MAX_REQUESTS) {
            return NextResponse.json(
                { success: false, message: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        rateLimit.set(ip, requestCount + 1);
        setTimeout(() => rateLimit.delete(ip), RATE_LIMIT_WINDOW);

        // 2. Input Validation
        const body = await request.json();
        const { name, company, email, type, message, phone, preferredAction } = body;

        // Strict Validation
        if (!name || name.length > 100) return errorResponse('Invalid name (max 100 chars)', 400);
        if (!message || message.length > 3000) return errorResponse('Invalid message (max 3000 chars)', 400); // Increased limit

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) return errorResponse('Invalid email address', 400);

        if (phone) {
            const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/; // Basic phone number validation
            if (!phoneRegex.test(phone)) return errorResponse('Invalid phone number', 400);
        }

        // Save the submission as a lead
        await addLead({
            name,
            email,
            phone: phone || null,
            company: company || null,
            companyType: type || null, // Map original 'type' to 'companyType'
            action: preferredAction || 'Standard Inquiry', // Map original 'preferredAction' to 'action'
            message
        });

        // 3. SMTP Configuration
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // 4. Send Email
        try {
            await transporter.sendMail({
                from: `"ZERO System" <${process.env.SMTP_USER}>`,
                to: process.env.EMAIL_TO,
                replyTo: email,
                subject: `🚀 New Lead: ${company || name} (${preferredAction || 'Contact'})`,
                text: `
                    Name: ${name}
                    Email: ${email}
                    Phone: ${phone || 'N/A'}
                    Company: ${company || 'N/A'} (${type || 'N/A'})
                    Action: ${preferredAction}
                    
                    Message:
                    ${message}
                `,
                html: `
                    <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #333;">New Lead Captured</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                        <p><strong>Company:</strong> ${company || 'N/A'} (${type || 'N/A'})</p>
                        <p><strong>Action:</strong> ${preferredAction}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <h3 style="color: #666;">Message</h3>
                        <p style="background: #f9f9f9; padding: 15px; border-radius: 4px;">${message}</p>
                    </div>
                `
            });
        } catch (mailError) {
            console.error('Failed to send email:', mailError);
            // We do not block the success response because the lead WAS saved to the admin panel.
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' });

    } catch (error) {
        console.error('Contact API Error:', error);
        return errorResponse('Internal Server Error', 500);
    }
}
