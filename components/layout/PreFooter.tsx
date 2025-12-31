'use client';

import Link from 'next/link';
import { Mail, Building2, Award, FileCheck } from 'lucide-react';

export default function PreFooter() {
    return (
        <div className="border-t border-white/5 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border border-white/5 p-8 md:p-12 rounded-2xl bg-[#080808] relative overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-zero-green/5 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="lg:w-1/2 text-center lg:text-left relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono tracking-tight">SECURE YOUR INFRASTRUCTURE.</h2>
                        <p className="text-[var(--text-muted)] mb-8 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                            Join the organizations that trust ZERO for their most critical operations.
                            Deploy on your own hardware. Keep your own keys.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/suite" className="bg-zero-green text-black font-mono font-bold py-3 px-8 hover:bg-white transition-colors text-center flex items-center justify-center gap-2 rounded-sm">
                                GET ACCESS
                            </Link>
                            <Link href="/contact" className="border border-white/10 text-[var(--text-main)] font-mono font-bold py-3 px-8 hover:border-zero-green hover:text-zero-green transition-colors flex items-center justify-center gap-2 rounded-sm bg-[#111]">
                                <Mail size={16} /> CONTACT SALES
                            </Link>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
                            <div className="flex flex-col items-center justify-center p-4 border border-white/5 bg-[#111] rounded hover:border-zero-green hover:text-zero-green transition-all group cursor-default h-32">
                                <Building2 className="mb-3 text-[#444] group-hover:text-zero-green transition-colors" size={24} />
                                <span className="text-[10px] font-mono font-bold text-center">IIT BOMBAY</span>
                                <span className="text-[8px] text-[var(--text-muted)] uppercase mt-1">Supported</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 border border-white/5 bg-[#111] rounded hover:border-zero-green hover:text-zero-green transition-all group cursor-default h-32">
                                <Building2 className="mb-3 text-[#444] group-hover:text-zero-green transition-colors" size={24} />
                                <span className="text-[10px] font-mono font-bold text-center">PIERC</span>
                                <span className="text-[8px] text-[var(--text-muted)] uppercase mt-1">Incubated</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 border border-white/5 bg-[#111] rounded hover:border-zero-green hover:text-zero-green transition-all group cursor-default h-32">
                                <Award className="mb-3 text-[#444] group-hover:text-zero-green transition-colors" size={24} />
                                <span className="text-[10px] font-mono font-bold text-center">ISO 27001</span>
                                <span className="text-[8px] text-[var(--text-muted)] uppercase mt-1">Aligned</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 border border-white/5 bg-[#111] rounded hover:border-zero-green hover:text-zero-green transition-all group cursor-default h-32">
                                <FileCheck className="mb-3 text-[#444] group-hover:text-zero-green transition-colors" size={24} />
                                <span className="text-[10px] font-mono font-bold text-center">GDPR</span>
                                <span className="text-[8px] text-[var(--text-muted)] uppercase mt-1">Aligned</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
