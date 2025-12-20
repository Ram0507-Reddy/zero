'use server';

import { updateService, Service } from '@/lib/services';
import { updateLeadStatus } from '@/lib/leads';
import { revalidatePath } from 'next/cache';

export async function saveServiceChanges(slug: string, data: Partial<Service>) {
    await updateService(slug, data);
    revalidatePath('/'); // Update public home
    revalidatePath('/services/[slug]', 'page'); // Update detail pages
    revalidatePath('/admin/dashboard'); // Update admin
    return { success: true };
}

export async function changeLeadStatus(id: string, status: 'new' | 'contacted' | 'closed') {
    await updateLeadStatus(id, status);
    revalidatePath('/admin/dashboard');
    return { success: true };
}
