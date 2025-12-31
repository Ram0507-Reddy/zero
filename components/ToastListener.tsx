'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ToastListener() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const successRaw = searchParams.get('success');
        const errorRaw = searchParams.get('error');

        if (successRaw) {
            setTimeout(() => {
                setToast({ message: successRaw === 'true' ? 'Operation successful' : successRaw, type: 'success' });
                // Clean URL
                const params = new URLSearchParams(searchParams);
                params.delete('success');
                router.replace(`${pathname}?${params.toString()}`);
            }, 0);
        } else if (errorRaw) {
            setTimeout(() => {
                setToast({ message: errorRaw, type: 'error' });
                // Clean URL
                const params = new URLSearchParams(searchParams);
                params.delete('error');
                router.replace(`${pathname}?${params.toString()}`);
            }, 0);
        }
    }, [searchParams, router, pathname]);

    if (!toast) return null;

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg border text-sm font-bold animate-in slide-in-from-bottom-5 fade-in duration-300 z-50 ${toast.type === 'success'
            ? 'bg-black text-[var(--neon)] border-[var(--neon)]'
            : 'bg-black text-red-500 border-red-500'
            }`}>
            {toast.message}
            <button onClick={() => setToast(null)} className="ml-4 opacity-50 hover:opacity-100">✕</button>
        </div>
    );
}
