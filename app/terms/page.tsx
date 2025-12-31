'use client';

import { Scale } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="pt-24 pb-12 animate-in fade-in duration-700 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-12 border-b border-[var(--border-color)] pb-8">
                    <h1 className="text-4xl font-bold mb-4 font-mono flex items-center gap-4">
                        <Scale size={32} className="text-zero-green" /> TERMS OF SERVICE
                    </h1>
                    <p className="text-[var(--text-muted)] font-mono text-sm">Last Updated: 2025-01-01 | Version: 2.4.0</p>
                </div>
                <div className="prose prose-invert max-w-none text-[var(--text-muted)] space-y-8 font-mono text-sm leading-relaxed">
                    <section>
                        <h2 className="text-[var(--text-main)] text-lg font-bold mb-4">1. THE ZERO COVENANT</h2>
                        <p>ZERO ("The System") provides infrastructure, not surveillance. By deploying our containers, you acknowledge that YOU are the sole custodian of your data.</p>
                    </section>
                    <section>
                        <h2 className="text-[var(--text-main)] text-lg font-bold mb-4">2. LICENSE & USAGE</h2>
                        <p>Upon purchase of a license, you are granted a perpetual, non-transferable right to deploy the software on your own hardware.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
