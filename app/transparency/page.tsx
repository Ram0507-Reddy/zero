'use client';

import { ScrollText } from 'lucide-react';

export default function TransparencyPage() {
    return (
        <div className="pt-24 pb-12 animate-in fade-in duration-700 min-h-screen">
            <div className="max-w-5xl mx-auto px-6">
                <div className="mb-12 border-b border-[var(--border-color)] pb-8">
                    <h1 className="text-4xl font-bold mb-4 font-mono flex items-center gap-4">
                        <ScrollText size={32} className="text-zero-green" /> TRANSPARENCY PRINCIPLES
                    </h1>
                    <p className="text-[var(--text-muted)] font-mono text-sm">
                        Trust through architecture, not promises.
                    </p>
                </div>

                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 md:p-12 mb-16 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">ZERO is built on the principle of minimal data exposure.</h2>
                    <div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
                        <p className="flex gap-4">
                            <span className="text-zero-green font-bold">01.</span>
                            We do not operate centralized user databases. Your users are yours alone.
                        </p>
                        <p className="flex gap-4">
                            <span className="text-zero-green font-bold">02.</span>
                            We do not maintain access to customer-owned infrastructure. Once deployed, the keys are yours.
                        </p>
                        <p className="flex gap-4">
                            <span className="text-zero-green font-bold">03.</span>
                            Our systems are designed so that compliance requests, if any, are handled at the operator level — not by ZERO.
                        </p>
                    </div>
                </div>

                <div className="text-center p-8 border border-[var(--border-color)] rounded-lg opacity-60">
                    <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                        Safe. True. Strong.
                    </p>
                </div>
            </div>
        </div>
    );
}
