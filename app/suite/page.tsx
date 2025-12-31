'use client';

import { Zap, Shield, Hash, Activity, Layers, Search, FileText, Clock, Database, FileDigit, Cpu, CheckCircle, Network } from 'lucide-react';

const SuitePage = () => {
    const coreProducts = [
        {
            id: 'media',
            title: 'ZERO MEDIA',
            desc: 'Image optimization & compression engine. Resize, convert, and serve assets locally. No CDN fees. Air-gap ready.',
            icon: <Zap size={24} />
        },
        {
            id: 'auth',
            title: 'ZERO AUTH',
            desc: 'Self-hosted identity system. Replace Auth0/Firebase. OAuth2 & JWT support. No external handshake. Designed to align with NIST security guidelines.',
            icon: <Shield size={24} />
        },
        {
            id: 'pay',
            title: 'ZERO PAY',
            desc: 'Secure UPI & Stripe wrapper. Handle payments without leaking transaction metadata to third parties. Designed to align with RBI digital payment guidelines.',
            icon: <Hash size={24} />
        },
        {
            id: 'notify',
            title: 'ZERO NOTIFY',
            desc: 'Unified notification system. Email, Push, SMS. You own the keys, you own the delivery. Audit logged.',
            icon: <Activity size={24} />
        }
    ];

    const expansionProducts = [
        { id: 'cache', title: 'ZERO CACHE', desc: 'High-performance Redis alternative for local caching.', icon: <Layers size={20} /> },
        { id: 'search', title: 'ZERO SEARCH', desc: 'Lightweight full-text search engine.', icon: <Search size={20} /> },
        { id: 'queue', title: 'ZERO QUEUE', desc: 'Robust background job and worker management.', icon: <Layers size={20} /> },
        { id: 'logs', title: 'ZERO LOGS', desc: 'Centralized log aggregation and analysis.', icon: <FileText size={20} /> },
        { id: 'ratelimit', title: 'ZERO RATELIMIT', desc: 'Advanced API rate limiting service.', icon: <Clock size={20} /> },
        { id: 'filestore', title: 'ZERO FILESTORE', desc: 'S3-compatible local object storage.', icon: <Database size={20} /> },
        { id: 'pdf', title: 'ZERO PDF', desc: 'High-fidelity HTML to PDF conversion engine.', icon: <FileDigit size={20} /> },
        { id: 'ai', title: 'ZERO AI', desc: 'Local, offline-capable AI utility microservices.', icon: <Cpu size={20} /> },
        { id: 'audit', title: 'ZERO AUDIT', desc: 'Immutable activity logging for compliance.', icon: <CheckCircle size={20} /> },
        { id: 'webhooks', title: 'ZERO WEBHOOKS', desc: 'Secure webhook management and delivery.', icon: <Network size={20} /> },
        { id: 'scheduler', title: 'ZERO SCHEDULER', desc: 'Precision Cron job engine and scheduler.', icon: <Clock size={20} /> },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-24 pb-12 px-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

                {/* SIDEBAR NAVIGATION */}
                <div className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h3 className="font-mono text-xs font-bold text-zero-green tracking-widest mb-4">CORE INFRASTRUCTURE</h3>
                            <ul className="space-y-2 text-sm font-mono text-[var(--text-muted)]">
                                {coreProducts.map(p => (
                                    <li key={p.id}>
                                        <button onClick={() => scrollToSection(p.id)} className="hover:text-[var(--text-main)] text-left w-full transition-colors">
                                            {p.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-mono text-xs font-bold text-zero-green tracking-widest mb-4">EXPANSION MODULES</h3>
                            <ul className="space-y-2 text-sm font-mono text-[var(--text-muted)]">
                                {expansionProducts.map(p => (
                                    <li key={p.id}>
                                        <button onClick={() => scrollToSection(p.id)} className="hover:text-[var(--text-main)] text-left w-full transition-colors">
                                            {p.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1">
                    <div className="mb-16">
                        <h2 className="font-mono text-zero-green text-sm tracking-widest mb-2">INFRASTRUCTURE</h2>
                        <h1 className="text-5xl font-bold mb-6">THE SUITE.</h1>
                        <p className="text-xl text-[var(--text-muted)] max-w-2xl">
                            A collection of microservices delivered as Docker containers.
                            Runs on your server. Runs offline. Designed for long-term deployment in high-security environments.
                        </p>
                    </div>

                    {/* CORE PRODUCTS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                        {coreProducts.map((prod) => (
                            <div id={prod.id} key={prod.id} className="bg-[var(--bg-card)] border border-white/10 p-8 rounded-lg hover:translate-y-[-2px] transition-transform duration-300 group scroll-mt-24">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-[var(--bg-panel)] border border-white/5 rounded-md text-[var(--text-main)] group-hover:text-zero-green transition-colors">
                                        {prod.icon}
                                    </div>
                                    <span className="font-mono text-xs border border-white/10 px-3 py-1 rounded-full text-[var(--text-muted)]">
                                        DOCKER
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{prod.title}</h3>
                                <p className="text-[var(--text-muted)] mb-8 leading-relaxed h-16">{prod.desc}</p>

                                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                    <span className="font-mono text-[var(--text-muted)] text-sm">Enterprise License</span>
                                    <button className="text-sm font-bold border-b border-transparent hover:border-[var(--text-main)] transition-colors">
                                        VIEW DOCS
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* EXPANSION PRODUCTS LIST */}
                    <div>
                        <div className="flex items-center mb-8">
                            <div className="w-8 h-1 bg-zero-green mr-4"></div>
                            <h2 className="font-mono text-xl font-bold tracking-widest">EXPANSION MICROSERVICES</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {expansionProducts.map((prod) => (
                                <div id={prod.id} key={prod.id} className="bg-[var(--bg-card)] border border-white/10 p-4 rounded flex items-start gap-4 hover:bg-[var(--bg-hover)] transition-colors scroll-mt-24">
                                    <div className="p-2 bg-[var(--bg-panel)] rounded text-[var(--text-muted)]">
                                        {prod.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-mono text-sm mb-1">{prod.title}</h4>
                                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{prod.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24 p-8 bg-[var(--code-bg)] border border-[var(--border-color)] rounded-xl text-center transition-colors duration-300">
                        <h3 className="font-mono text-xl font-bold mb-4">DEPLOYMENT STRATEGY</h3>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-[var(--text-muted)] font-mono">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-zero-green rounded-full"></span> 1. Download Image
                            </div>
                            <div className="hidden md:block">→</div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-zero-green rounded-full"></span> 2. Docker Compose
                            </div>
                            <div className="hidden md:block">→</div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-zero-green rounded-full"></span> 3. Zero Config
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuitePage;
