'use client';

import { Fingerprint, Network, Shield, FileText, Building2 } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="pt-24 pb-12 animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-24 text-center">
                    <h2 className="font-mono text-zero-green text-sm tracking-widest mb-4">WHO WE ARE</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">INVISIBLE INFRASTRUCTURE</h1>
                    <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
                        Born from independent research and forged in the fire of modern cybersecurity needs.
                        We are the architects of the silent web.
                    </p>
                </div>
                {/* Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    <div className="border-t border-[var(--border-color)] pt-8">
                        <Fingerprint className="text-zero-green mb-6" size={40} />
                        <h3 className="text-xl font-bold mb-4 font-mono">IDENTITY</h3>
                        <p className="text-[var(--text-muted)] leading-relaxed">We believe identity belongs to the individual. Our systems are built on Self-Sovereign Identity (SSI) principles.</p>
                    </div>
                    <div className="border-t border-[var(--border-color)] pt-8">
                        <Network className="text-zero-green mb-6" size={40} />
                        <h3 className="text-xl font-bold mb-4 font-mono">SOVEREIGNTY</h3>
                        <p className="text-[var(--text-muted)] leading-relaxed">True sovereignty requires independence. Our stack is designed to run on bare metal, air-gapped from the public cloud.</p>
                    </div>
                    <div className="border-t border-[var(--border-color)] pt-8">
                        <Shield className="text-zero-green mb-6" size={40} />
                        <h3 className="text-xl font-bold mb-4 font-mono">SECURITY</h3>
                        <p className="text-[var(--text-muted)] leading-relaxed">Security is not an add-on; it is the substrate. From memory-safe languages to zero-trust architecture.</p>
                    </div>
                </div>

                {/* Founder Leadership */}
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-12 mb-24 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3">
                            <div className="w-full aspect-square bg-[var(--code-bg)] border border-[var(--border-color)] flex items-center justify-center relative">
                                <FileText size={64} className="text-[var(--text-muted)] opacity-20" />
                                <div className="absolute bottom-4 left-4">
                                    <div className="font-mono text-xs text-zero-green">SHRIRAM REDDY</div>
                                    <div className="font-mono text-[10px] text-[var(--text-muted)]">FOUNDER & CEO</div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-3xl font-bold mb-6">THE PHILOSOPHY</h3>
                            <div className="prose prose-invert max-w-none text-[var(--text-muted)] leading-relaxed space-y-4">
                                <p>"In a world that monetizes surveillance, privacy is a revolutionary act. We started ZERO not to build another SaaS tool, but to reclaim the digital commons."</p>
                                <p>Developed through independent research and supported by academic and incubation ecosystems. Today, ZERO serves as the backbone for organizations that cannot afford to be watched.</p>
                            </div>
                            <div className="mt-8 flex gap-4">
                                <div className="border border-[var(--border-color)] px-4 py-2 text-xs font-mono">SUPPORTED BY: IIT BOMBAY & PIERC</div>
                                <div className="border border-[var(--border-color)] px-4 py-2 text-xs font-mono">RESEARCH: Privacy - Selfhosting</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compliance Reiteration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 border border-[var(--border-color)]">
                        <h4 className="font-mono text-xs tracking-widest text-[var(--text-muted)] mb-6">COMPLIANCE STANDARDS</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 -mx-2 hover:bg-[var(--card-bg)] rounded transition-colors cursor-default">
                                <span className="font-bold">ISO 27001</span>
                                <span className="text-zero-green text-sm">Designed to align</span>
                            </div>
                            <div className="w-full h-[1px] bg-[var(--border-color)]"></div>
                            <div className="flex items-center justify-between p-2 -mx-2 hover:bg-[var(--card-bg)] rounded transition-colors cursor-default">
                                <span className="font-bold">GDPR / DPDP INDIA</span>
                                <span className="text-zero-green text-sm">Designed to align</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border border-[var(--border-color)]">
                        <h4 className="font-mono text-xs tracking-widest text-[var(--text-muted)] mb-6">STRATEGIC ALLIANCES</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 -mx-2 hover:bg-[var(--card-bg)] rounded transition-colors cursor-default">
                                <span className="font-bold text-[var(--text-muted)]">IIT BOMBAY E-CELL</span>
                                <Building2 size={16} className="text-zero-green" />
                            </div>
                            <div className="flex items-center justify-between p-2 -mx-2 hover:bg-[var(--card-bg)] rounded transition-colors cursor-default">
                                <span className="font-bold text-[var(--text-muted)]">PIERC INCUBATION</span>
                                <Building2 size={16} className="text-zero-green" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
