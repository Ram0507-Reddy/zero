'use client';

import Link from 'next/link';
import { useState } from 'react';
import ContactModal from './ContactModal';

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tighter neon-text">
                        ZERO_SUITE
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm hover:text-[var(--neon)] transition-colors">
                            HOME
                        </Link>
                        <Link href="/services" className="text-sm hover:text-[var(--neon)] transition-colors">
                            SERVICES
                        </Link>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 text-sm font-bold border border-[var(--neon)] text-[var(--neon)] hover:bg-[var(--neon)] hover:text-black transition-all duration-300"
                    >
                        CONTACT SALES
                    </button>
                </div>
            </nav>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
