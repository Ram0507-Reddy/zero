import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
        const { name, company, email, type, message } = body;

        // Strict Validation
        if (!name || name.length > 100) return errorResponse('Invalid name (max 100 chars)', 400);
        if (!message || message.length > 2000) return errorResponse('Invalid message (max 2000 chars)', 400);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) return errorResponse('Invalid email address', 400);

        // 3. SMTP Configuration
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const internalEmail = process.env.EMAIL_TO || 'sales@zero-s.tech';
        const fromEmail = process.env.EMAIL_FROM || 'sales@zero-s.tech';

        // 4. Send Internal Email
        await transporter.sendMail({
            from: `"${name}" <${fromEmail}>`,
            replyTo: email,
            to: internalEmail,
            subject: `New Lead: ${company || name} (${type})`,
            text: `
Name: ${name}
Company: ${company || 'N/A'}
Type: ${type}
Email: ${email}

Message:
${message}
            `,
            html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Company:</strong> ${company || 'N/A'}</p>
<p><strong>Type:</strong> ${type}</p>
<p><strong>Email:</strong> ${email}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `
        });

        // 5. Send Auto-Reply (Fail-Safe)
        try {
            await transporter.sendMail({
                from: `"ZERO Team" <${fromEmail}>`,
                to: email,
                subject: 'We received your request — ZERO',
                text: `
Hi ${name},

Thanks for contacting ZERO.
Our team has received your message and will get back to you shortly.

— ZERO Team
https://zero-s.tech
                `
            });
        } catch (autoReplyError) {
            console.error('Auto-reply failed:', autoReplyError);
            // Non-blocking error
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' });

    } catch (error) {
        console.error('Email API Error:', error);
        return errorResponse('Something went wrong. Please try again.', 500);
    }
}
