import Link from 'next/link';
import { ArrowRight, CheckCircle, FileText, Shield, Database, Server, EyeOff, Lock } from 'lucide-react';
import InteractiveTerminal from '@/components/terminal/InteractiveTerminal';
import { getLandingContent } from '@/lib/content';

export const dynamic = 'force-dynamic'; // Ensure we always fetch fresh content

export default async function ManifestoPage() {
    const content = await getLandingContent();

    return (
        <div className="pt-24 pb-12 animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-6">

                {/* HERO SECTION */}
                <div className="flex flex-col lg:flex-row mb-16 mt-4 md:mt-8 gap-12 lg:gap-16">
                    <div className="lg:w-1/2">
                        <div className="pl-2 md:pl-6">
                            <h1 className="font-mono text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                <span className="block animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">{content.hero.line1}</span>
                                <span className="text-zero-green block animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300">
                                    {content.hero.line2}
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-backwards">
                                {content.hero.description}
                            </p>
                        </div>

                        <div className="mt-8 pl-2 md:pl-6 flex flex-col gap-4">
                            <Link
                                href="/suite"
                                className="bg-[var(--text-main)] text-[var(--bg-main)] font-mono font-bold py-3 md:py-4 px-6 md:px-8 hover:bg-zero-green hover:text-black transition-colors flex items-center w-full md:w-fit justify-center md:justify-start rounded-sm"
                            >
                                {content.hero.cta} <ArrowRight className="ml-2" size={18} />
                            </Link>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-mono text-[var(--text-muted)] mt-2">
                                <span className="flex items-center gap-1">
                                    <CheckCircle size={14} className="text-zero-green" /> {content.hero.cert1}
                                </span>
                                <span className="flex items-center gap-1">
                                    <CheckCircle size={14} className="text-zero-green" /> {content.hero.cert2}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Founder's Desk */}
                    <div className="lg:w-1/2 lg:pl-8 mt-12 lg:mt-0">
                        <div className="h-full flex flex-col justify-center">
                            <div className="mb-6 flex items-center space-x-2">
                                <FileText size={16} className="text-zero-green" />
                                <span className="font-mono text-xs tracking-widest text-zero-green uppercase">{content.founder.title}</span>
                            </div>
                            <div className="prose prose-invert max-w-none text-sm leading-7 text-[var(--text-muted)] font-mono">
                                <p className="mb-4">
                                    {content.founder.p1}
                                </p>
                                <p className="mb-4">
                                    {content.founder.p2}
                                </p>
                                <p className="mb-6">
                                    {content.founder.p3_1} <br />
                                    <span className="text-[var(--text-main)] bg-zero-green/10 px-1">{content.founder.p3_2}</span>
                                </p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
                                <div>
                                    <div className="text-[var(--text-main)] font-mono font-bold">{content.founder.name}</div>
                                    <div className="text-[var(--text-muted)] text-xs font-mono">{content.founder.role}</div>
                                </div>
                                <div className="opacity-20">
                                    <Shield size={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CORE CONFIGURATION GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <div className="p-8 border border-white/10 bg-[var(--bg-card)] rounded-lg hover:border-zero-green hover:bg-[var(--bg-hover)] transition-all duration-300 group">
                        <Database className="text-zero-green mb-4" size={32} />
                        <h3 className="font-mono text-lg font-bold mb-2 group-hover:text-zero-green transition-colors">{content.grid.card1_title}</h3>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                            {content.grid.card1_desc}
                        </p>
                    </div>

                    <div className="p-8 border border-white/10 bg-[var(--bg-card)] rounded-lg hover:border-zero-green hover:bg-[var(--bg-hover)] transition-all duration-300 group">
                        <Server className="text-zero-green mb-4" size={32} />
                        <h3 className="font-mono text-lg font-bold mb-2 group-hover:text-zero-green transition-colors">{content.grid.card2_title}</h3>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                            {content.grid.card2_desc}
                        </p>
                    </div>

                    <div className="p-8 border border-white/10 bg-[var(--bg-card)] rounded-lg hover:border-zero-green hover:bg-[var(--bg-hover)] transition-all duration-300 group">
                        <EyeOff className="text-zero-green mb-4" size={32} />
                        <h3 className="font-mono text-lg font-bold mb-2 group-hover:text-zero-green transition-colors">{content.grid.card3_title}</h3>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                            {content.grid.card3_desc}
                        </p>
                    </div>

                    <div className="p-8 border border-white/10 bg-[var(--bg-card)] rounded-lg hover:border-zero-green hover:bg-[var(--bg-hover)] transition-all duration-300 group">
                        <Lock className="text-zero-green mb-4" size={32} />
                        <h3 className="font-mono text-lg font-bold mb-2 group-hover:text-zero-green transition-colors">{content.grid.card4_title}</h3>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                            {content.grid.card4_desc}
                        </p>
                    </div>
                </div>

                {/* TERMINAL BLOCK */}
                <div className="max-w-4xl mx-auto mb-16">
                    <p className="font-mono text-xs text-center mb-4 text-[var(--text-muted)]">OPTIONAL INTERACTIVE EXPLORATION</p>
                    <InteractiveTerminal />
                </div>

            </div>
        </div>
    );
}
