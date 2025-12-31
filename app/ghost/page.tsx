'use client';

import { Cpu, ArrowRight } from 'lucide-react';

export default function GhostPage() {
    return (
        <div className="pt-24 pb-12 px-6 min-h-screen flex items-center animate-in fade-in duration-1000">
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-1 bg-zero-green mr-4"></div>
                    <h2 className="font-mono text-zero-green tracking-widest text-sm">INTERNAL PROTOCOLS</h2>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] to-[var(--text-muted)]">
                    GHOST<br />PROTOCOL
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                    <div>
                        <p className="text-xl text-[var(--text-muted)] leading-relaxed mb-6">
                            Privacy is about encryption. <br />
                            <span className="text-[var(--text-main)] font-bold">Ghost focuses on minimizing observable communication signals.</span>
                        </p>
                        <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                            A hyper-secure communication architecture designed to be invisible.
                            Unlike standard messengers, Ghost is designed to minimize observable communication metadata and signaling using advanced steganography and network obfuscation.
                        </p>

                        <div className="inline-block border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-muted)] px-4 py-2 font-mono text-xs rounded mb-6">
                            STATUS: ACTIVE DEVELOPMENT
                        </div>

                        <div>
                            <a
                                href="https://zero-message.vercel.app/notes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-zero-green text-black px-6 py-3 rounded font-bold font-mono text-sm hover:bg-white transition-colors"
                            >
                                SEE THE PROJECT <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>

                    <div className="bg-[var(--code-bg)] border border-[var(--border-color)] p-6 font-mono text-xs text-[var(--text-muted)] relative overflow-hidden transition-colors duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-zero-green opacity-50"></div>
                        <p>{'>'} initiating handshake...</p>
                        <p>{'>'} route: [PROTECTED]</p>
                        <p>{'>'} keys: generated (local)</p>
                        <p>{'>'} obfuscation: active</p>
                        <p className="text-[var(--text-main)] mt-4">{'>'} CONNECTION ESTABLISHED</p>

                        <div className="mt-8 flex justify-end">
                            <Cpu className="text-[var(--text-muted)] animate-pulse" size={48} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
