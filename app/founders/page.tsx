'use client';

import { Globe, Code, Activity } from 'lucide-react';

export default function FoundersPage() {
    return (
        <div className="pt-24 pb-12 px-6 animate-in slide-in-from-right-4 duration-500">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[var(--border-color)] pb-8">
                    <div>
                        <h1 className="text-5xl font-bold mb-4">THE DASHBOARD.</h1>
                        <p className="text-xl text-[var(--text-muted)] max-w-xl">
                            Operating system for the next generation of privacy-first startups.
                            Guidance. Roadmaps. Execution.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <button className="bg-zero-green text-black font-mono font-bold py-3 px-6 hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-colors">
                            APPLY FOR ACCESS
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 rounded-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-[var(--text-main)]"><Globe size={100} /></div>
                        <h3 className="font-mono text-xl font-bold mb-4 text-zero-green">01. MAP</h3>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">From "Idea" to "Deployment". Step-by-step technical and business roadmaps.</p>
                    </div>
                    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 rounded-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-[var(--text-main)]"><Code size={100} /></div>
                        <h3 className="font-mono text-xl font-bold mb-4 text-zero-green">02. BUILD</h3>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">Access to the ZERO Suite ecosystem. Drag, drop, and deploy secure infrastructure.</p>
                    </div>
                    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 rounded-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-[var(--text-main)]"><Activity size={100} /></div>
                        <h3 className="font-mono text-xl font-bold mb-4 text-zero-green">03. SIGNAL</h3>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">A live feed of hackathons, grants, and showcase events.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
