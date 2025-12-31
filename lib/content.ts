import fs from 'fs/promises';
import path from 'path';

const contentPath = path.join(process.cwd(), 'content', 'landing.json');

export interface LandingContent {
    hero: {
        line1: string;
        line2: string;
        description: string;
        cta: string;
        cert1: string;
        cert2: string;
    };
    founder: {
        title: string;
        p1: string;
        p2: string;
        p3_1: string;
        p3_2: string;
        name: string;
        role: string;
    };
    grid: {
        card1_title: string;
        card1_desc: string;
        card2_title: string;
        card2_desc: string;
        card3_title: string;
        card3_desc: string;
        card4_title: string;
        card4_desc: string;
    };
}

export async function getLandingContent(): Promise<LandingContent> {
    try {
        const data = await fs.readFile(contentPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading landing content:', error);
        // Fallback or re-throw
        throw new Error('Failed to load content');
    }
}

export async function updateLandingContent(newContent: LandingContent) {
    try {
        await fs.writeFile(contentPath, JSON.stringify(newContent, null, 4), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing landing content:', error);
        throw new Error('Failed to save content');
    }
}
