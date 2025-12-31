'use client';

import { useState } from 'react';

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        companyType: 'Startup (<10)',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [actionType, setActionType] = useState<'message' | 'callback'>('message');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/suite/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    preferredAction: actionType
                }),
            });

            if (!res.ok) throw new Error('Failed to send');

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', company: '', companyType: 'Startup (<10)', message: '' });
            if (onSuccess) onSuccess();
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-zinc-900/80 border border-white/10 rounded-xl p-10 backdrop-blur-xl">

            {/* Action Toggle - More Formal */}
            <div className="flex gap-4 mb-10 p-1 bg-black/50 rounded-lg border border-white/5">
                <button
                    type="button"
                    onClick={() => setActionType('message')}
                    className={`flex-1 py-4 text-sm font-bold tracking-widest rounded-md transition-all ${actionType === 'message' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    SEND MESSAGE
                </button>
                <button
                    type="button"
                    onClick={() => setActionType('callback')}
                    className={`flex-1 py-4 text-sm font-bold tracking-widest rounded-md transition-all ${actionType === 'callback' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    REQUEST CALLBACK
                </button>
            </div>

            {status === 'success' ? (
                <div className="text-center py-16">
                    <div className="text-white text-6xl mb-6">✓</div>
                    <h3 className="text-3xl text-white font-bold mb-4">Request Received</h3>
                    <p className="text-gray-400 text-lg">We will be in touch shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">Full Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-lg text-white focus:border-white/40 focus:bg-black focus:outline-none transition-all placeholder:text-gray-800"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">Email Address</label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-lg text-white focus:border-white/40 focus:bg-black focus:outline-none transition-all placeholder:text-gray-800"
                                placeholder="john@company.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">Company Name</label>
                            <input
                                required
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-lg text-white focus:border-white/40 focus:bg-black focus:outline-none transition-all placeholder:text-gray-800"
                                placeholder="Acme Inc."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">Company Type</label>
                            <div className="relative">
                                <select
                                    value={formData.companyType}
                                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-lg text-white focus:border-white/40 focus:bg-black focus:outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option>Startup (&lt;10)</option>
                                    <option>Scale-up (10-50)</option>
                                    <option>Enterprise (50+)</option>
                                    <option>Ready to Deploy</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">▼</div>
                            </div>
                        </div>
                    </div>

                    {/* Conditional Phone Field (Mandatory for Callback) */}
                    {actionType === 'callback' && (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="block text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">Phone Number (Required)</label>
                            <input
                                required={actionType === 'callback'}
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-lg text-white focus:border-white/40 focus:bg-black focus:outline-none transition-all placeholder:text-gray-800"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold tracking-widest text-gray-500 mb-3 uppercase">Message / Requirements</label>
                        <textarea
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-lg text-white focus:border-white/40 focus:bg-black focus:outline-none transition-all placeholder:text-gray-800"
                            placeholder="Tell us about your infrastructure needs..."
                        />
                    </div>

                    <button
                        disabled={status === 'loading'}
                        type="submit"
                        className="w-full bg-white text-black font-bold text-lg py-5 rounded-lg hover:bg-gray-200 transition-all uppercase tracking-widest disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        {status === 'loading' ? 'Processing...' : actionType === 'callback' ? 'Request Call' : 'Send Message'}
                    </button>

                    {status === 'error' && (
                        <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
                    )}
                </form>
            )}
        </div>
    );
}
