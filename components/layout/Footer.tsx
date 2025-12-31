'use client';

import Link from 'next/link';
import { Mail, Twitter, Linkedin, Github, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#050505] pt-16 pb-8 px-6 transition-colors duration-300 relative overflow-hidden">
            {/* Gradient Top Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zero-green/30 to-transparent"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
                <div className="mb-12 md:mb-0 max-w-sm flex flex-col justify-between h-full">
                    <div>
                        <Link href="/" className="font-mono text-2xl font-bold tracking-tighter mb-4 cursor-pointer inline-flex items-center group">
                            <span className="text-zero-green group-hover:animate-pulse">{'>'}</span>
                            <span className="text-[var(--text-main)] mx-1">ZERO</span>
                            <span className="text-zero-green">_</span>
                        </Link>
                        <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed font-mono">
                            Infrastructure for the silent web. <br />
                            Privacy is the baseline, not the upgrade.
                        </p>
                        <div className="flex gap-4 mb-8">
                            <a href="mailto:devzeroapi@gmail.com" className="p-2 border border-white/10 rounded-md text-[var(--text-muted)] hover:text-zero-green hover:border-zero-green hover:bg-white/5 transition-all" title="Email Us"><Mail size={18} /></a>
                            <a href="#" className="p-2 border border-white/10 rounded-md text-[var(--text-muted)] hover:text-zero-green hover:border-zero-green hover:bg-white/5 transition-all" title="Twitter / X"><Twitter size={18} /></a>
                            <a href="#" className="p-2 border border-white/10 rounded-md text-[var(--text-muted)] hover:text-zero-green hover:border-zero-green hover:bg-white/5 transition-all" title="LinkedIn"><Linkedin size={18} /></a>
                            <a href="#" className="p-2 border border-white/10 rounded-md text-[var(--text-muted)] hover:text-zero-green hover:border-zero-green hover:bg-white/5 transition-all" title="GitHub"><Github size={18} /></a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-16 font-mono text-xs text-[var(--text-muted)] w-full md:w-auto">
                    <div className="flex flex-col gap-4 min-w-[120px]">
                        <span className="text-[var(--text-main)] font-bold tracking-widest border-b border-white/10 pb-2 mb-2 inline-block w-fit">SYSTEM</span>
                        <Link href="/" className="text-left hover:text-zero-green transition-colors hover:translate-x-1 duration-200 block">Manifesto</Link>
                        <Link href="/suite" className="text-left hover:text-zero-green transition-colors hover:translate-x-1 duration-200 block">Products</Link>
                        <Link href="/ghost" className="text-left hover:text-zero-green transition-colors hover:translate-x-1 duration-200 block">Security</Link>
                    </div>
                    <div className="flex flex-col gap-4 min-w-[120px]">
                        <span className="text-[var(--text-main)] font-bold tracking-widest border-b border-white/10 pb-2 mb-2 inline-block w-fit">LEGAL</span>
                        <Link href="/terms" className="text-left hover:text-zero-green transition-colors hover:translate-x-1 duration-200 block">Terms of Service</Link>
                        <Link href="/privacy" className="text-left hover:text-zero-green transition-colors hover:translate-x-1 duration-200 block">Privacy Policy</Link>
                        <Link href="/transparency" className="text-left hover:text-zero-green transition-colors hover:translate-x-1 duration-200 block">Transparency</Link>
                    </div>
                    <div className="flex flex-col gap-4 w-full md:w-72">
                        <span className="text-[var(--text-main)] font-bold tracking-widest border-b border-white/10 pb-2 mb-2 inline-block w-fit">UPDATES</span>
                        <p className="text-[10px] leading-relaxed">
                            Receive security briefings and product updates. No spam.
                        </p>
                        <div className="flex gap-2 relative">
                            <input type="email" placeholder="Enter contact email" className="bg-[#111] border border-white/10 text-[var(--text-main)] px-3 py-2 text-xs w-full focus:outline-none focus:border-zero-green transition-colors rounded-sm placeholder:text-neutral-700" />
                            <button className="bg-zero-green text-black px-3 py-2 hover:bg-white transition-colors font-bold rounded-sm"><ArrowRight size={14} /></button>
                        </div>
                        <span className="flex items-center text-zero-green text-[10px] mt-2 bg-zero-green/10 px-2 py-1 rounded w-fit border border-zero-green/20">
                            <span className="w-1.5 h-1.5 bg-zero-green rounded-full mr-2 animate-pulse"></span>
                            SYSTEM OPERATIONAL
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
