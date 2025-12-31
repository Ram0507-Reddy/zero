import { redirect } from 'next/navigation';
import { checkAuth } from '../actions';
import { getAllServices } from '@/lib/services';
import { getAllLeads } from '@/lib/leads';
import { getLandingContent } from '@/lib/content';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        redirect('/dashboard/admin');
    }

    const services = await getAllServices();
    const leads = await getAllLeads();
    const content = await getLandingContent();

    return <AdminDashboardClient initialServices={services} initialLeads={leads} initialContent={content} />;
}
