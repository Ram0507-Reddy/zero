import { redirect } from 'next/navigation';
import { checkAuth, logout } from '../actions';
import { getAllServices } from '@/lib/services';
import { getAllLeads } from '@/lib/leads';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        redirect('/admin');
    }

    const services = await getAllServices();
    const leads = await getAllLeads();

    return <AdminDashboardClient initialServices={services} initialLeads={leads} />;
}
