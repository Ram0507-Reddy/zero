import fs from 'fs/promises';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data/leads.json');

export interface Lead {
    id: string;
    name: string;
    company: string;
    companyType: string;
    email: string;
    phone?: string;
    action: 'message' | 'callback';
    message?: string;
    timestamp: string;
    status: 'new' | 'contacted' | 'closed';
}

export async function getAllLeads(): Promise<Lead[]> {
    try {
        const content = await fs.readFile(LEADS_FILE, 'utf-8');
        const data = JSON.parse(content);
        return Array.isArray(data) ? data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) : [];
    } catch {
        // If file doesn't exist or is empty, return empty array
        return [];
    }
}

export async function addLead(lead: Omit<Lead, 'id' | 'timestamp' | 'status'>) {
    const leads = await getAllLeads();
    const newLead: Lead = {
        ...lead,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        status: 'new'
    };

    leads.unshift(newLead);

    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    return newLead;
}

export async function updateLeadStatus(id: string, status: Lead['status']) {
    const leads = await getAllLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
        leads[index].status = status;
        await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
        return true;
    }
    return false;
}
