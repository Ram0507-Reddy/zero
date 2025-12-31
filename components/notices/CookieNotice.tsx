'use client';

import { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

export default function CookieNotice() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show immediately on load
        setVisible(true);

        // Hide after 4 seconds
        const timer = setTimeout(() => {
            setVisible(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="bg-[var(--bg-main)] border border-zero-green/50 p-4 rounded shadow-lg flex items-start gap-4">
                <div className="bg-zero-green/10 p-2 rounded-full">
                    <Shield size={20} className="text-zero-green" />
                </div>
                <div>
                    <h4 className="font-mono text-xs font-bold text-zero-green mb-1 uppercase tracking-wider">Privacy Notice</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        This site does not use tracking cookies or third-party analytics. No behavioral data is collected by default.
                    </p>
                </div>
                <button onClick={() => setVisible(false)} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}
