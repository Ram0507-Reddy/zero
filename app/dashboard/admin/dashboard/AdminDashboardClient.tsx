'use client';

import { useState } from 'react';
import { Service } from '@/lib/services';
import { Lead } from '@/lib/leads';
// import ContentEditor from '@/components/ContentEditor';
import { LandingContent } from '@/lib/content';
import {
    updateServiceAction,
    changeLeadStatus,
    logout,
    updateLandingContentAction
} from '@/app/dashboard/admin/actions';
import {
    LayoutDashboard,
    Box,
    Users,
    LogOut,
    Search,
    Save,
    CheckCircle,
    Clock,
    XCircle,
    Phone,
    Mail,
    FileText // Import FileText for Content Icon
} from 'lucide-react';

interface Props {
    initialServices: Service[];
    initialLeads: Lead[];
    initialContent: LandingContent;
}

export default function AdminDashboardClient({ initialServices, initialLeads, initialContent }: Props) {
    const [activeTab, setActiveTab] = useState<'services' | 'leads' | 'content'>('services');
    const [searchTerm, setSearchTerm] = useState('');

    // Services State
    const [services, setServices] = useState(initialServices);
    const [editingService, setEditingService] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Service>>({});

    // Leads State
    const [leads, setLeads] = useState(initialLeads);

    // -- Service Handlers --
    const handleEditStart = (service: Service) => {
        setEditingService(service.slug);
        setEditForm(service);
    };

    const handleEditSave = async () => {
        if (!editingService) return;

        // Optimistic Update
        setServices(prev => prev.map(s => s.slug === editingService ? { ...s, ...editForm } as Service : s));
        setEditingService(null);

        const formData = new FormData();
        formData.append('name', editForm.name || '');
        formData.append('description', editForm.description || '');
        // We don't edit features/pros in the quick dashboard view, so we skip them or send current values.
        // Actually the dashboard view is simple. Let's just send what we have.
        // The server action might overwrite missing fields with empty?
        // Let's check updateServiceAction. It constructs a Partial<Service>.
        // It reads 'features' from formData. If missing, it might be undefined.
        // The `updateService` lib function merges data.
        // So safe to send partial.

        await updateServiceAction(editingService, formData);
        alert('Service Updated Successfully!');
    };

    // -- Lead Handlers --
    const handleLeadStatus = async (id: string, status: Lead['status']) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
        await changeLeadStatus(id, status);
    };

    // Filter Logic
    const filteredServices = services.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredLeads = leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.company.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex min-h-dvh bg-black text-white font-sans selection:bg-neon selection:text-black">

            {/* SIDEBAR */}
            <aside className="w-64 border-r border-white/10 bg-zinc-900/50 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-mono font-bold">ZERO<span className="text-neon">ADMIN</span></h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold transition-colors ${activeTab === 'services' ? 'bg-neon text-black' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <Box size={18} /> SERVICE CONTROL
                    </button>
                    <button
                        onClick={() => setActiveTab('leads')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold transition-colors ${activeTab === 'leads' ? 'bg-neon text-black' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <Users size={18} /> LEADS & ORDERS
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold transition-colors ${activeTab === 'content' ? 'bg-neon text-black' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <FileText size={18} /> PAGE CONTENT
                    </button>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded text-red-500 hover:bg-red-500/10 text-sm font-bold transition-colors"
                    >
                        <LogOut size={18} /> LOGOUT
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">{activeTab === 'services' ? 'Master Service Control' : 'Sales Leads & Inquiries'}</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-black border border-white/20 rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:border-neon focus:outline-none"
                        />
                    </div>
                </div>

                {/* SERVICES VIEW */}
                {activeTab === 'services' && (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredServices.map(service => (
                            <div key={service.slug} className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
                                {editingService === service.slug ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-400 uppercase">Service Name</label>
                                                <input
                                                    value={editForm.name}
                                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                    className="w-full bg-black border border-white/20 p-2 rounded text-neon font-bold font-mono"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 uppercase">Slug (ID)</label>
                                                <input
                                                    value={service.slug}
                                                    disabled
                                                    className="w-full bg-black/50 border border-white/10 p-2 rounded text-gray-500 font-mono cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400 uppercase">Description</label>
                                            <textarea
                                                value={editForm.description}
                                                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                                className="w-full bg-black border border-white/20 p-2 rounded text-white h-24"
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setEditingService(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                                            <button onClick={handleEditSave} className="bg-neon text-black px-6 py-2 rounded font-bold text-sm flex items-center gap-2 hover:bg-green-400">
                                                <Save size={16} /> SAVE CHANGES
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold font-mono text-neon mb-1">{service.name}</h3>
                                            <p className="text-gray-400 text-sm max-w-2xl">{service.description}</p>
                                        </div>
                                        <button
                                            onClick={() => handleEditStart(service)}
                                            className="border border-white/20 px-4 py-2 rounded text-sm hover:bg-white/10 transition-colors"
                                        >
                                            EDIT
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}


                {/* LEADS VIEW */}
                {activeTab === 'leads' && (
                    <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 font-mono text-xs uppercase border-b border-white/10">
                                <tr>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Company</th>
                                    <th className="p-4">Request Type</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">No leads found.</td>
                                    </tr>
                                ) : filteredLeads.map(lead => (
                                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${lead.status === 'new' ? 'bg-blue-500' : lead.status === 'contacted' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                                            <span className="text-sm font-bold uppercase">{lead.status}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold">{lead.name}</div>
                                            <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                                                {lead.email}
                                            </div>
                                            {lead.phone && <div className="text-xs text-neon mt-1 font-mono">{lead.phone}</div>}
                                        </td>
                                        <td className="p-4">
                                            <div>{lead.company}</div>
                                            <div className="text-xs text-gray-500 border border-white/10 rounded px-1 inline-block mt-1">{lead.companyType}</div>
                                        </td>
                                        <td className="p-4">
                                            {lead.action === 'callback' ? (
                                                <span className="text-neon flex items-center gap-1 font-bold text-xs border border-neon/30 bg-neon/10 px-2 py-1 rounded w-fit">
                                                    <Phone size={12} /> CALL REQUEST
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 flex items-center gap-1 text-xs border border-white/10 px-2 py-1 rounded w-fit">
                                                    <Mail size={12} /> MESSAGE
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm text-gray-500 font-mono">
                                            {new Date(lead.timestamp).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleLeadStatus(lead.id, e.target.value as any)}
                                                className="bg-black border border-white/20 rounded text-xs p-2 focus:border-neon focus:outline-none"
                                            >
                                                <option value="new">Mark New</option>
                                                <option value="contacted">Mark Contacted</option>
                                                <option value="closed">Mark Closed</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* CONTENT EDITOR VIEW */}
                {/* CONTENT EDITOR VIEW */}
                {activeTab === 'content' && (
                    <div className="space-y-6 animate-in fade-in duration-300 pb-20">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold font-mono text-neon">LANDING PAGE CONTENT</h2>
                            <button
                                onClick={() => {
                                    document.getElementById('cms-submit-btn')?.click();
                                }}
                                className="bg-neon text-black px-6 py-2 rounded font-bold hover:bg-white transition-colors text-sm font-mono flex items-center gap-2"
                            >
                                <Save size={16} /> DEPLOY CHANGES
                            </button>
                        </div>

                        <form action={async (formData) => {
                            const newContent = {
                                hero: {
                                    line1: formData.get('hero.line1') as string,
                                    line2: formData.get('hero.line2') as string,
                                    description: formData.get('hero.description') as string,
                                    cta: formData.get('hero.cta') as string,
                                    cert1: formData.get('hero.cert1') as string,
                                    cert2: formData.get('hero.cert2') as string,
                                },
                                founder: {
                                    title: formData.get('founder.title') as string,
                                    p1: formData.get('founder.p1') as string,
                                    p2: formData.get('founder.p2') as string,
                                    p3_1: formData.get('founder.p3_1') as string,
                                    p3_2: formData.get('founder.p3_2') as string,
                                    name: formData.get('founder.name') as string,
                                    role: formData.get('founder.role') as string,
                                },
                                grid: {
                                    card1_title: formData.get('grid.card1_title') as string,
                                    card1_desc: formData.get('grid.card1_desc') as string,
                                    card2_title: formData.get('grid.card2_title') as string,
                                    card2_desc: formData.get('grid.card2_desc') as string,
                                    card3_title: formData.get('grid.card3_title') as string,
                                    card3_desc: formData.get('grid.card3_desc') as string,
                                    card4_title: formData.get('grid.card4_title') as string,
                                    card4_desc: formData.get('grid.card4_desc') as string,
                                }
                            };
                            await updateLandingContentAction(newContent);
                            alert('Content Updated & Deployed!');
                        }} className="space-y-8">
                            <button id="cms-submit-btn" type="submit" className="hidden"></button>

                            {/* HERO */}
                            <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
                                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-neon rounded-full"></span> HERO SECTION
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-mono uppercase">Headline 1</label>
                                        <input name="hero.line1" defaultValue={initialContent.hero.line1} className="w-full bg-black border border-white/20 rounded p-2 text-white text-md font-mono focus:border-neon outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-mono uppercase">Headline 2 (Green)</label>
                                        <input name="hero.line2" defaultValue={initialContent.hero.line2} className="w-full bg-black border border-white/20 rounded p-2 text-white text-md font-mono focus:border-neon outline-none" />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[10px] text-gray-500 font-mono uppercase">Description</label>
                                        <textarea name="hero.description" defaultValue={initialContent.hero.description} rows={2} className="w-full bg-black border border-white/20 rounded p-2 text-white text-md font-mono focus:border-neon outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-mono uppercase">CTA Text</label>
                                        <input name="hero.cta" defaultValue={initialContent.hero.cta} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-mono uppercase">Cert 1</label>
                                        <input name="hero.cert1" defaultValue={initialContent.hero.cert1} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-mono uppercase">Cert 2</label>
                                        <input name="hero.cert2" defaultValue={initialContent.hero.cert2} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                    </div>
                                </div>
                            </div>

                            {/* FOUNDER */}
                            <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
                                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-neon rounded-full"></span> FOUNDER SECTION
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-mono uppercase">Title</label>
                                        <input name="founder.title" defaultValue={initialContent.founder.title} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-mono uppercase">Paragraph 1</label>
                                        <textarea name="founder.p1" defaultValue={initialContent.founder.p1} rows={3} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-mono uppercase">Paragraph 2</label>
                                        <textarea name="founder.p2" defaultValue={initialContent.founder.p2} rows={3} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 font-mono uppercase">Closing 1</label>
                                            <input name="founder.p3_1" defaultValue={initialContent.founder.p3_1} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 font-mono uppercase">Closing 2</label>
                                            <input name="founder.p3_2" defaultValue={initialContent.founder.p3_2} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 font-mono uppercase">Name</label>
                                            <input name="founder.name" defaultValue={initialContent.founder.name} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 font-mono uppercase">Role</label>
                                            <input name="founder.role" defaultValue={initialContent.founder.role} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm font-mono focus:border-neon outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* GRID */}
                            <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
                                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-neon rounded-full"></span> FEATURE GRID
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 p-3 border border-white/5 bg-black/50 rounded">
                                        <input name="grid.card1_title" defaultValue={initialContent.grid.card1_title} className="w-full bg-transparent border-b border-white/20 text-neon font-bold text-sm font-mono focus:outline-none" />
                                        <textarea name="grid.card1_desc" defaultValue={initialContent.grid.card1_desc} className="w-full bg-transparent text-gray-400 text-xs font-mono focus:outline-none resize-none" rows={3} />
                                    </div>
                                    <div className="space-y-2 p-3 border border-white/5 bg-black/50 rounded">
                                        <input name="grid.card2_title" defaultValue={initialContent.grid.card2_title} className="w-full bg-transparent border-b border-white/20 text-neon font-bold text-sm font-mono focus:outline-none" />
                                        <textarea name="grid.card2_desc" defaultValue={initialContent.grid.card2_desc} className="w-full bg-transparent text-gray-400 text-xs font-mono focus:outline-none resize-none" rows={3} />
                                    </div>
                                    <div className="space-y-2 p-3 border border-white/5 bg-black/50 rounded">
                                        <input name="grid.card3_title" defaultValue={initialContent.grid.card3_title} className="w-full bg-transparent border-b border-white/20 text-neon font-bold text-sm font-mono focus:outline-none" />
                                        <textarea name="grid.card3_desc" defaultValue={initialContent.grid.card3_desc} className="w-full bg-transparent text-gray-400 text-xs font-mono focus:outline-none resize-none" rows={3} />
                                    </div>
                                    <div className="space-y-2 p-3 border border-white/5 bg-black/50 rounded">
                                        <input name="grid.card4_title" defaultValue={initialContent.grid.card4_title} className="w-full bg-transparent border-b border-white/20 text-neon font-bold text-sm font-mono focus:outline-none" />
                                        <textarea name="grid.card4_desc" defaultValue={initialContent.grid.card4_desc} className="w-full bg-transparent text-gray-400 text-xs font-mono focus:outline-none resize-none" rows={3} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
