'use client';

import { useState } from 'react';

export default function ContactForm({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setSuccess(true);
            setTimeout(() => {
                onSuccess(); // Close modal or trigger parent callback
            }, 3000);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="text-center py-12">
                <div className="text-[var(--neon)] text-4xl mb-4">✓</div>
                <p className="text-white">Thank you for reaching out.<br />Our team will get back to you soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs text-gray-400 mb-1">FULL NAME <span className="text-red-500">*</span></label>
                <input name="name" required className="w-full bg-white/5 border border-white/10 p-2 text-white outline-none focus:border-[var(--neon)]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">COMPANY NAME</label>
                    <input name="company" className="w-full bg-white/5 border border-white/10 p-2 text-white outline-none focus:border-[var(--neon)]" />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">COMPANY TYPE</label>
                    <select name="type" className="w-full bg-white/5 border border-white/10 p-2 text-white outline-none focus:border-[var(--neon)]">
                        <option value="Startup">Startup</option>
                        <option value="SMB">SMB</option>
                        <option value="Enterprise">Enterprise</option>
                        <option value="Government">Government</option>
                        <option value="Ready to Deploy">Ready to Deploy</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs text-gray-400 mb-1">WORK EMAIL <span className="text-red-500">*</span></label>
                <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 p-2 text-white outline-none focus:border-[var(--neon)]" />
            </div>

            <div>
                <label className="block text-xs text-gray-400 mb-1">MESSAGE <span className="text-red-500">*</span></label>
                <textarea name="message" rows={4} required className="w-full bg-white/5 border border-white/10 p-2 text-white outline-none focus:border-[var(--neon)]"></textarea>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--neon)] text-black font-bold py-3 hover:bg-[#2bc90e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'SENDING...' : 'INITIATE CONTACT'}
            </button>
        </form>
    );
}
