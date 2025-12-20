'use server';

import { verifyPassword, createSession, deleteSession, isAuthenticated } from '@/lib/auth';
import { updateService, toggleService } from '@/lib/services';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function loginAction(formData: FormData) {
    const password = formData.get('password') as string;
    const isValid = await verifyPassword(password);

    if (!isValid) {
        return { success: false, message: 'Invalid Credentials' };
    }

    await createSession();
    redirect('/admin/dashboard');
}

export async function logoutAction() {
    await deleteSession();
    redirect('/admin/login');
}

export async function updateServiceAction(slug: string, formData: FormData) {
    const isAuth = await isAuthenticated();
    if (!isAuth) throw new Error('Unauthorized');

    // CSRF Check
    const csrfToken = formData.get('csrf_token') as string;
    const { verifyCsrfToken } = await import('@/lib/auth'); // Lazy import to avoid circular deps if any
    const isValidCsrf = await verifyCsrfToken(csrfToken);

    if (!isValidCsrf) {
        throw new Error('Invalid CSRF Token'); // In a real app, return proper error state
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const features = (formData.get('features') as string).split(',').map(s => s.trim()).filter(Boolean);
    const pros = (formData.get('pros') as string).split(',').map(s => s.trim()).filter(Boolean);

    // Comparison data parsing from form naming convention
    const competitorName = formData.get('competitorName') as string;
    const competitorCons = (formData.get('competitorCons') as string).split(',').map(s => s.trim()).filter(Boolean);
    const zeroAdvantages = (formData.get('zeroAdvantages') as string).split(',').map(s => s.trim()).filter(Boolean);

    await updateService(slug, {
        name,
        description,
        features,
        pros,
        comparison: {
            competitorName,
            competitorCons,
            zeroAdvantages
        }
    });

    revalidatePath('/'); // Revalidate everything
    revalidatePath('/admin');
    revalidatePath('/admin/dashboard');
    redirect('/admin/dashboard?success=Configuration+saved');
}

export async function toggleServiceAction(slug: string, enabled: boolean, formData: FormData) {
    const isAuth = await isAuthenticated();
    if (!isAuth) throw new Error('Unauthorized');

    // CSRF Check
    const csrfToken = formData.get('csrf_token') as string;
    const { verifyCsrfToken } = await import('@/lib/auth');
    const isValidCsrf = await verifyCsrfToken(csrfToken);

    if (!isValidCsrf) {
        throw new Error('Invalid CSRF Token');
    }

    await toggleService(slug, enabled);
    revalidatePath('/');
    revalidatePath('/admin');
}
