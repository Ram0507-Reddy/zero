'use server';

import { sendEmail } from '@/lib/email';
import { EmailPayload } from '@/lib/email';

export async function submitContactForm(formData: FormData) {
    const rawData: EmailPayload = {
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        email: formData.get('email') as string,
        type: formData.get('type') as string,
        message: formData.get('message') as string,
    };

    // Basic validation
    if (!rawData.email || !rawData.message) {
        return { success: false, message: 'Missing required fields' };
    }

    try {
        await sendEmail(rawData);
        return { success: true, message: 'Thank you. Our team will get back to you soon.' };
    } catch {
        return { success: false, message: 'Failed to send message.' };
    }
}
