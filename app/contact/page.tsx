'use client';

import { useState } from 'react';
import { CheckCircle, User, Building2, Phone, Mail, Box, ChevronDown, Briefcase, Send } from 'lucide-react';

export default function ContactSalesPage() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        stage: '',
        product: '',
        email: '',
        mobile: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => setSubmitted(true), 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="pt-24 pb-12 animate-in fade-in duration-700 min-h-[80vh] flex items-center justify-center">
            <div className="max-w-3xl mx-auto px-6 w-full">
                <div className="mb-12 text-center">
                    <h2 className="font-mono text-zero-green text-sm tracking-widest mb-4">INITIATE HANDSHAKE</h2>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">SECURE CHANNEL</h1>
                    <p className="text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed mb-8">
                        Begin the procurement process. Your inquiry is handled through a secure communication channel.
                        We typically respond within 4 hours.
                    </p>
                </div>
                {submitted ? (
                    <div className="bg-[var(--card-bg)] border border-zero-green p-12 text-center rounded-lg animate-in zoom-in-95 duration-300">
                        <CheckCircle size={64} className="text-zero-green mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-2">TRANSMISSION RECEIVED</h3>
                        <p className="text-[var(--text-muted)] mb-8">
                            Our team is analyzing your requirements. Expect a secure communication shortly.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-sm font-mono text-zero-green hover:underline"
                        >
                            SEND ANOTHER TRANSMISSION
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden">
                        {/* Form content */}
                        <div className="space-y-6">
                            <div className="relative group">
                                <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within:text-zero-green transition-colors" size={18} />
                                    <input required name="name" type="text" value={formData.name} onChange={handleChange} className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] pl-12 pr-4 py-3 rounded focus:outline-none focus:border-zero-green transition-colors" placeholder="Enter full name" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                    <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Company Name</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within:text-zero-green transition-colors" size={18} />
                                        <input required name="company" type="text" value={formData.company} onChange={handleChange} className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] pl-12 pr-4 py-3 rounded focus:outline-none focus:border-zero-green transition-colors" placeholder="Organization Ltd." />
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within:text-zero-green transition-colors" size={18} />
                                        <input required name="mobile" type="tel" value={formData.mobile} onChange={handleChange} className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] pl-12 pr-4 py-3 rounded focus:outline-none focus:border-zero-green transition-colors" placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Email ID</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within:text-zero-green transition-colors" size={18} />
                                    <input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] pl-12 pr-4 py-3 rounded focus:outline-none focus:border-zero-green transition-colors" placeholder="name@company.com" />
                                </div>
                            </div>
                            <div className="relative group">
                                <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Product Interest</label>
                                <div className="relative">
                                    <Box className="absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within:text-zero-green transition-colors" size={18} />
                                    <ChevronDown className="absolute right-4 top-3.5 text-[var(--text-muted)] pointer-events-none" size={18} />
                                    <select required name="product" value={formData.product} onChange={handleChange} className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] pl-12 pr-10 py-3 rounded focus:outline-none focus:border-zero-green transition-colors appearance-none cursor-pointer">
                                        <option value="" disabled>Select a product</option>
                                        <option value="general">General Inquiry</option>
                                        <optgroup label="Core Infrastructure">
                                            <option value="media">ZERO Media</option>
                                            <option value="auth">ZERO Auth</option>
                                            <option value="pay">ZERO Pay</option>
                                            <option value="notify">ZERO Notify</option>
                                        </optgroup>
                                        <optgroup label="Expansion Microservices">
                                            <option value="cache">ZERO Cache</option>
                                            <option value="search">ZERO Search</option>
                                            <option value="queue">ZERO Queue</option>
                                            <option value="logs">ZERO Logs</option>
                                            <option value="ratelimit">ZERO RateLimit</option>
                                            <option value="filestore">ZERO FileStore</option>
                                            <option value="pdf">ZERO PDF</option>
                                            <option value="ai">ZERO AI</option>
                                            <option value="audit">ZERO Audit</option>
                                            <option value="webhooks">ZERO Webhooks</option>
                                            <option value="scheduler">ZERO Scheduler</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                            <div className="relative group">
                                <label className="block text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Company Stage</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within:text-zero-green transition-colors" size={18} />
                                    <ChevronDown className="absolute right-4 top-3.5 text-[var(--text-muted)] pointer-events-none" size={18} />
                                    <select required name="stage" value={formData.stage} onChange={handleChange} className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] pl-12 pr-10 py-3 rounded focus:outline-none focus:border-zero-green transition-colors appearance-none cursor-pointer">
                                        <option value="" disabled>Select current stage</option>
                                        <option value="idea">Idea / Concept Phase</option>
                                        <option value="mvp">MVP (Prototype Ready)</option>
                                        <option value="early_traction">Early Traction (Live Users)</option>
                                        <option value="growth">Growth Stage (Scaling)</option>
                                        <option value="enterprise">Enterprise / Government</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-zero-green text-black font-mono font-bold py-4 mt-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                <Send size={18} /> ESTABLISH UPLINK
                            </button>
                            <div className="text-center mt-4">
                                <p className="text-[10px] text-[var(--text-muted)] font-mono">
                                    * Data is handled through controlled, internal systems. No third-party processors by default.
                                </p>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
