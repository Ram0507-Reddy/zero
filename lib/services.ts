import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data/services');

export interface Service {
    slug: string;
    name: string;
    description: string;
    enabled: boolean;
    features: string[];
    pros: string[];
    comparison: {
        competitorName: string;
        competitorCons: string[];
        zeroAdvantages: string[];
    };
}

export async function getAllServices(): Promise<Service[]> {
    try {
        const files = await fs.readdir(DATA_DIR);
        const services = await Promise.all(
            files.filter(f => f.endsWith('.json')).map(async (file) => {
                const content = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
                return JSON.parse(content) as Service;
            })
        );
        return services;
    } catch (error) {
        console.error('Error reading services:', error);
        return [];
    }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    try {
        // Security: Prevent path traversal
        const safeSlug = slug.replace(/[^a-z0-9-]/g, '');
        const filePath = path.join(DATA_DIR, `${safeSlug}.json`);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content) as Service;
    } catch {
        return null;
    }
}

// Helper for Atomic Writes
async function atomicWrite(filePath: string, data: unknown) {
    const tempPath = `${filePath}.tmp`;
    const content = JSON.stringify(data, null, 2);

    // Write to temp file first
    await fs.writeFile(tempPath, content);

    // Rename temp file to actual file (atomic operation)
    await fs.rename(tempPath, filePath);
}

// Validation Helper
function validateService(data: Service): string | null {
    if (!data.name || data.name.length > 100) return 'Name invalid or too long (max 100 chars)';
    if (!data.description || data.description.length > 2000) return 'Description invalid or too long (max 2000 chars)';

    // Basic XSS/HTML Injection Check (Reject <script, javascript:, on*)
    const dangerPattern = /<script|javascript:|on\w+=/i;

    if (dangerPattern.test(data.name) || dangerPattern.test(data.description)) return 'Invalid characters detected';

    for (const f of data.features) {
        if (dangerPattern.test(f)) return 'Invalid characters in features';
    }
    for (const p of data.pros) {
        if (dangerPattern.test(p)) return 'Invalid characters in pros';
    }

    return null;
}

export async function updateService(slug: string, data: Partial<Service>): Promise<Service | null> {
    const current = await getServiceBySlug(slug);
    if (!current) return null;

    const updated = { ...current, ...data };

    const error = validateService(updated);
    if (error) {
        throw new Error(`Validation Failed: ${error}`);
    }

    try {
        await atomicWrite(path.join(DATA_DIR, `${slug}.json`), updated);
        return updated;
    } catch (err) {
        console.error('Failed to update service:', err);
        throw new Error('Database write failed');
    }
}

export async function toggleService(slug: string, enabled: boolean): Promise<Service | null> {
    return updateService(slug, { enabled });
}
