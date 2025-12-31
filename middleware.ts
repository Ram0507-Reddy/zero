import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('zero_admin_session');

    // Protect /dashboard/admin routes
    if (request.nextUrl.pathname.startsWith('/dashboard/admin')) {
        // Allow the login page itself if it were ever accessed directly, but mainly we want to protect the inner dashboard
        // Actually, /dashboard/admin (no trailing slash or subpath) IS the login page in the old structure. 
        // But we want /admin to be the login.

        // Let's protect /dashboard/admin/dashboard (the actual app)
        if (request.nextUrl.pathname.startsWith('/dashboard/admin/dashboard')) {
            if (!sessionCookie) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/admin/:path*',
};
