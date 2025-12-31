'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Moon, Sun, Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';

// Updated to work without props for Zero-Safe strict layout
interface NavProps {
    theme?: 'light' | 'dark';
    toggleTheme?: () => void;
}

export default function Nav({ theme = 'dark', toggleTheme = () => { } }: NavProps) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [projectsOpen, setProjectsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProjectsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setProjectsOpen(false);
    }, [pathname]);

    const isActive = (path: string) => pathname === path;
    const isProjectActive = ['/suite', '/ghost', '/founders'].includes(pathname);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-black/60">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zero-green/50 to-transparent opacity-50"></div>
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* LOGO */}
                <Link
                    href="/"
                    className="flex items-center font-mono text-2xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <span className="text-zero-green">{'>'}</span>
                    <span className="text-[var(--text-main)]">ZERO</span>
                    <span className="text-zero-green cursor-blink">_</span>
                </Link>

                {/* DESKTOP LINKS */}
                <div className="hidden md:flex items-center space-x-8">
                    {/* MANIFESTO */}
                    <Link
                        href="/"
                        className={`font-mono text-xs tracking-widest transition-colors ${isActive('/') ? 'text-zero-green' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                            }`}
                    >
                        MANIFESTO
                    </Link>

                    {/* PROJECTS DROPDOWN */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setProjectsOpen(!projectsOpen)}
                            className={`flex items-center font-mono text-xs tracking-widest transition-colors ${isProjectActive ? 'text-zero-green' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                                }`}
                        >
                            PROJECTS <ChevronDown size={14} className={`ml-1 transition-transform ${projectsOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {projectsOpen && (
                            <div
                                className="absolute top-full left-0 mt-2 w-48 bg-[var(--bg-main)] border border-[var(--border-color)] shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
                            >
                                <Link
                                    href="/suite"
                                    className="block w-full text-left px-4 py-3 text-xs font-mono text-[var(--text-muted)] hover:text-zero-green hover:bg-[var(--card-bg)]"
                                >
                                    ZERO SUITE
                                </Link>
                                <Link
                                    href="/ghost"
                                    className="block w-full text-left px-4 py-3 text-xs font-mono text-[var(--text-muted)] hover:text-zero-green hover:bg-[var(--card-bg)]"
                                >
                                    GHOST PROTOCOL
                                </Link>
                                <Link
                                    href="/founders"
                                    className="block w-full text-left px-4 py-3 text-xs font-mono text-[var(--text-muted)] hover:text-zero-green hover:bg-[var(--card-bg)]"
                                >
                                    DASHBOARD
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ABOUT */}
                    <Link
                        href="/about"
                        className={`font-mono text-xs tracking-widest transition-colors ${isActive('/about') ? 'text-zero-green' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                            }`}
                    >
                        ABOUT
                    </Link>

                    {/* THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        className="text-[var(--text-muted)] hover:text-zero-green transition-colors ml-4 p-2 rounded-full hover:bg-[var(--card-bg)]"
                        title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* MOBILE MENU TOGGLE */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="text-[var(--text-muted)] hover:text-zero-green transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[var(--text-main)]">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <MobileMenu isOpen={mobileMenuOpen} closeMenu={() => setMobileMenuOpen(false)} />
        </nav>
    );
}
