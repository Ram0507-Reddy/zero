'use client';

import { useState } from 'react';
import { Service } from '@/lib/services';
import { Lead } from '@/lib/leads';
import { saveServiceChanges, changeLeadStatus } from './actions';
import { logout } from '../actions';
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
    Mail
} from 'lucide-react';

interface Props {
    initialServices: Service[];
    initialLeads: Lead[];
}

export default function AdminDashboardClient({ initialServices, initialLeads }: Props) {
    const [activeTab, setActiveTab] = useState<'services' | 'leads'>('services');
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

        await saveServiceChanges(editingService, editForm);
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
        <div className="flex h-screen bg-black text-white font-sans selection:bg-neon selection:text-black">

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
            </main>
        </div>
    );
}
