'use client';

import { EyeOff } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="pt-24 pb-12 animate-in fade-in duration-700 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-12 border-b border-[var(--border-color)] pb-8">
                    <h1 className="text-4xl font-bold mb-4 font-mono flex items-center gap-4">
                        <EyeOff size={32} className="text-zero-green" /> PRIVACY PROTOCOL
                    </h1>
                    <p className="text-[var(--text-muted)] font-mono text-sm">Policy Status: ACTIVE | Data Collection: NULL</p>
                </div>
                <div className="prose prose-invert max-w-none text-[var(--text-muted)] space-y-8 font-mono text-sm leading-relaxed">
                    <section>
                        <h2 className="text-[var(--text-main)] text-lg font-bold mb-4">1. DATA MINIMIZATION</h2>
                        <p>Our website does not load Google Analytics, Facebook Pixels, or any third-party scripts.</p>
                    </section>
                    <section>
                        <h2 className="text-[var(--text-main)] text-lg font-bold mb-4">2. TELEMETRY</h2>
                        <p>ZERO systems are designed with telemetry disabled by default. Any data collection requires explicit configuration by the operator.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
