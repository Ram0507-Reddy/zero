import fs from 'fs/promises';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'data/landing.json');

export interface LandingContent {
    hero: {
        badge: string;
        title: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };
    problems: {
        title1: string;
        desc1: string;
        title2: string;
        desc2: string;
        title3: string;
        desc3: string;
    };
    sections: {
        coreTitle: string;
        coreDesc: string;
        expansionTitle: string;
        expansionDesc: string;
        ctaFooterTitle: string;
        ctaFooterDesc: string;
        ctaFooterButton: string;
    };
}

export async function getLandingContent(): Promise<LandingContent> {
    try {
        const data = await fs.readFile(CONTENT_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Fallback if file missing
        return {
            hero: {
                badge: "v1.0.0 STABLE RELEASE",
                title: "The Privacy-First, Self-Hosted Suite.",
                subtitle: "Own your data. No hidden fees. 0% Transaction Fees.",
                ctaPrimary: "VIEW MODULES",
                ctaSecondary: "LIVE DEMO"
            },
            problems: {
                title1: "SaaS Fatigue?",
                desc1: "Stop bleeding ₹20k+/month...",
                title2: "Privacy Risk?",
                desc2: "Your data shouldn't live elsewhere...",
                title3: "Vendor Lock-in?",
                desc3: "Own your containers..."
            },
            sections: {
                coreTitle: "CORE INFRASTRUCTURE",
                coreDesc: "Essential building blocks.",
                expansionTitle: "EXPANSION UTILITIES",
                expansionDesc: "Drop-in replacements.",
                ctaFooterTitle: "Ready to go ZERO?",
                ctaFooterDesc: "Stop renting.",
                ctaFooterButton: "GET THE SUITE"
            }
        };
    }
}

export async function updateLandingContent(content: LandingContent): Promise<void> {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
}
