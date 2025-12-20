import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Default for dev
const COOKIE_NAME = 'zero_admin_session';

export function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function verifyPassword(password: string): Promise<boolean> {
    // In a real app, ADMIN_PASSWORD should be a hash. 
    // For this prompt, assuming direct comparison or simple hash check.
    // If env var is plain text:
    return password === ADMIN_PASSWORD;
}

export async function createSession() {
    const cookieStore = await cookies();
    // Session token
    const token = crypto.randomBytes(32).toString('hex');
    // CSRF token - separate from session token for double-submit cookie pattern
    const csrfToken = crypto.randomBytes(32).toString('hex');

    // Store both in the cookie (simplified for this context)
    // In a real DB-backed app, session ID would be in cookie, CSRF token in DB or derived
    // Here we'll store a JSON object in the cookie
    const sessionData = JSON.stringify({ token, csrfToken });
    const encryptedSession = sessionData; // In real app, encrypt this

    cookieStore.set(COOKIE_NAME, encryptedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    return cookieStore.has(COOKIE_NAME);
}

export async function getCsrfToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);
    if (!sessionCookie) return null;

    try {
        const data = JSON.parse(sessionCookie.value);
        return data.csrfToken || null;
    } catch {
        return null;
    }
}

export async function verifyCsrfToken(token: string): Promise<boolean> {
    const storedToken = await getCsrfToken();
    return storedToken === token;
}
