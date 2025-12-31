'use client';

import { useState, useEffect } from 'react';
import Nav from './navigation/Nav';
import Footer from './layout/Footer';
import PreFooter from './layout/PreFooter';
import CookieNotice from './notices/CookieNotice';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="w-full min-h-dvh relative transition-colors duration-300 bg-[var(--bg-main)] text-[var(--text-main)] overflow-x-hidden" data-theme={theme}>
            <Nav theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-1 w-full">
                {children}
            </main>
            <PreFooter />
            <Footer />
            <CookieNotice />
        </div>
    );
}
