'use client';

import Link from 'next/link';

interface MobileMenuProps {
    isOpen: boolean;
    closeMenu: () => void;
}

export default function MobileMenu({ isOpen, closeMenu }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-6 shadow-2xl animate-in slide-in-from-top-5 duration-200 z-40">
            <Link href="/" onClick={closeMenu} className="font-mono text-left text-sm tracking-widest text-[var(--text-muted)] hover:text-zero-green border-b border-white/5 pb-4">
                MANIFESTO
            </Link>

            <div className="flex flex-col space-y-4 pl-4 border-l border-white/10">
                <span className="font-mono text-[10px] text-zero-green font-bold tracking-widest uppercase mb-2">PROJECTS</span>
                <Link href="/suite" onClick={closeMenu} className="font-mono text-left text-sm tracking-widest text-[var(--text-muted)] hover:text-white transition-colors">
                    ZERO SUITE
                </Link>
                <Link href="/ghost" onClick={closeMenu} className="font-mono text-left text-sm tracking-widest text-[var(--text-muted)] hover:text-white transition-colors">
                    GHOST PROTOCOL
                </Link>
                <Link href="/founders" onClick={closeMenu} className="font-mono text-left text-sm tracking-widest text-[var(--text-muted)] hover:text-white transition-colors">
                    DASHBOARD
                </Link>
            </div>

            <Link href="/about" onClick={closeMenu} className="font-mono text-left text-sm tracking-widest text-[var(--text-muted)] hover:text-zero-green border-t border-white/5 pt-4">
                ABOUT
            </Link>
        </div>
    );
}
