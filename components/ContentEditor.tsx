'use client';

import { useState } from 'react';
import { LandingContent } from '@/lib/content';
import { Save, RefreshCw } from 'lucide-react';
import { updateLandingContentAction } from '@/app/admin/actions';

interface Props {
    initialContent: LandingContent;
}

export default function ContentEditor({ initialContent }: Props) {
    const [content, setContent] = useState<LandingContent>(initialContent);
    const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    const handleChange = (section: keyof LandingContent, field: string, value: string) => {
        setContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
        setStatus('idle');
    };

    const handleSave = async () => {
        setStatus('saving');
        await updateLandingContentAction(content);
        setStatus('success');
        setTimeout(() => setStatus('idle'), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">

            {/* Toolbar */}
            <div className="flex justify-between items-center bg-zinc-900/50 p-4 border border-white/10 rounded-lg sticky top-0 z-10 backdrop-blur-md">
                <span className="text-sm font-mono text-gray-400">MASTER CONTENT EDITOR</span>
                <button
                    onClick={handleSave}
                    disabled={status === 'saving'}
                    className="bg-neon text-black px-6 py-2 rounded font-bold text-sm flex items-center gap-2 hover:bg-green-400 disabled:opacity-50"
                >
                    {status === 'saving' ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                    {status === 'saving' ? 'SYNCING...' : status === 'success' ? 'PUBLISHED!' : 'PUBLISH CHANGES'}
                </button>
            </div>

            {/* Hero Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">HERO SECTION</h3>
                <div className="grid gap-4">
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Badge Text</label>
                        <input
                            value={content.hero.badge}
                            onChange={e => handleChange('hero', 'badge', e.target.value)}
                            className="w-full bg-black border border-white/20 p-2 text-neon font-mono rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Main Title</label>
                        <textarea
                            value={content.hero.title}
                            onChange={e => handleChange('hero', 'title', e.target.value)}
                            rows={2}
                            className="w-full bg-black border border-white/20 p-2 text-white font-bold text-lg rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Subtitle</label>
                        <textarea
                            value={content.hero.subtitle}
                            onChange={e => handleChange('hero', 'subtitle', e.target.value)}
                            rows={3}
                            className="w-full bg-black border border-white/20 p-2 text-gray-300 rounded"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 uppercase">Primary CTA</label>
                            <input
                                value={content.hero.ctaPrimary}
                                onChange={e => handleChange('hero', 'ctaPrimary', e.target.value)}
                                className="w-full bg-black border border-white/20 p-2 text-white rounded"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase">Secondary CTA</label>
                            <input
                                value={content.hero.ctaSecondary}
                                onChange={e => handleChange('hero', 'ctaSecondary', e.target.value)}
                                className="w-full bg-black border border-white/20 p-2 text-white rounded"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statements */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">PROBLEM STATEMENTS</h3>
                {[1, 2, 3].map(num => (
                    <div key={num} className="bg-zinc-900/30 p-4 rounded border border-white/5">
                        <div className="mb-2">
                            <label className="text-xs text-gray-500 uppercase">Problem {num} Title</label>
                            <input
                                // @ts-expect-error dynamic access
                                value={content.problems[`title${num}`]}
                                // @ts-expect-error dynamic access
                                onChange={e => handleChange('problems', `title${num}`, e.target.value)}
                                className="w-full bg-black border border-white/20 p-2 text-white font-bold rounded"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase">Problem {num} Description</label>
                            <textarea
                                // @ts-expect-error dynamic access
                                value={content.problems[`desc${num}`]}
                                // @ts-expect-error dynamic access
                                onChange={e => handleChange('problems', `desc${num}`, e.target.value)}
                                rows={2}
                                className="w-full bg-black border border-white/20 p-2 text-gray-400 rounded"
                            />
                        </div>
                    </div>
                ))}
            </section>

            {/* Section Headers */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">SECTION HEADERS</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Core Title</label>
                        <input value={content.sections.coreTitle} onChange={e => handleChange('sections', 'coreTitle', e.target.value)} className="w-full bg-black border border-white/20 p-2 text-white rounded" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Core Desc</label>
                        <input value={content.sections.coreDesc} onChange={e => handleChange('sections', 'coreDesc', e.target.value)} className="w-full bg-black border border-white/20 p-2 text-white rounded" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Expansion Title</label>
                        <input value={content.sections.expansionTitle} onChange={e => handleChange('sections', 'expansionTitle', e.target.value)} className="w-full bg-black border border-white/20 p-2 text-white rounded" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Expansion Desc</label>
                        <input value={content.sections.expansionDesc} onChange={e => handleChange('sections', 'expansionDesc', e.target.value)} className="w-full bg-black border border-white/20 p-2 text-white rounded" />
                    </div>
                </div>
            </section>
        </div>
    );
}
