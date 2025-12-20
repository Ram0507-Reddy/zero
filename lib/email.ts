export interface EmailPayload {
    name: string;
    company: string;
    email: string;
    type: string;
    message: string;
}

export async function sendEmail(data: EmailPayload) {
    // Mock implementation for "No DB / No external lib dependency initially"
    console.log('--- SENDING EMAIL ---');
    console.log('To:', process.env.ADMIN_EMAIL || 'admin@zero-s.tech');
    console.log('Data:', data);
    console.log('---------------------');

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        success: true,
        message: "Email sent successfully"
    };
}
