'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_USER = 'admin@zerotech';
const ADMIN_PASS = 'DevZero@2025!Secure';
const SESSION_COOKIE = 'zero_admin_session';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (email === ADMIN_USER && password === ADMIN_PASS) {
        // Set a secure session cookie
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE, 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        redirect('/dashboard/admin/dashboard');
    } else {
        return { error: 'Invalid credentials' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    redirect('/admin');
}

export async function checkAuth() {
    const cookieStore = await cookies();
    return cookieStore.has(SESSION_COOKIE);
}

// -- Service Actions --
import { updateService, Service } from '@/lib/services';
import { updateLeadStatus } from '@/lib/leads';
import { revalidatePath } from 'next/cache';

export async function updateServiceAction(slug: string, formData: FormData) {
    const data: Partial<Service> = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        features: (formData.get('features') as string)?.split(',').map(s => s.trim()).filter(Boolean),
        pros: (formData.get('pros') as string)?.split(',').map(s => s.trim()).filter(Boolean),
        comparison: {
            competitorName: formData.get('competitorName') as string,
            competitorCons: (formData.get('competitorCons') as string)?.split(',').map(s => s.trim()).filter(Boolean),
            zeroAdvantages: (formData.get('zeroAdvantages') as string)?.split(',').map(s => s.trim()).filter(Boolean),
        }
    };

    await updateService(slug, data);
    revalidatePath('/dashboard'); // Update public home (dashboard home)
    revalidatePath('/dashboard/services/[slug]', 'page'); // Update detail pages
    revalidatePath('/dashboard/admin/dashboard'); // Update admin
}

export async function changeLeadStatus(id: string, status: 'new' | 'contacted' | 'closed') {
    await updateLeadStatus(id, status);
    revalidatePath('/dashboard/admin/dashboard');
    return { success: true };
}

import { updateLandingContent, LandingContent } from '@/lib/content';

export async function updateLandingContentAction(content: LandingContent) {
    await updateLandingContent(content);
    revalidatePath('/');
    revalidatePath('/dashboard/admin/dashboard');
    return { success: true };
}
