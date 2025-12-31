import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminGuard({ children }: { children: React.ReactNode }) {
    const isAuth = await isAuthenticated();

    if (!isAuth) {
        redirect('/suite/admin');
    }

    return <>{children}</>;
}
