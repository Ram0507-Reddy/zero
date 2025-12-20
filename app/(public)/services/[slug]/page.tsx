import { getServiceBySlug } from "@/lib/services";
import ComparisonTable from "@/components/ComparisonTable";
import FeatureBox from "@/components/FeatureBox";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCsrfToken } from "@/lib/auth"; // If needed for forms later, but here just display

export const revalidate = 0;

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service || !service.enabled) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon selection:text-black">
            {/* Header / Nav */}
            <div className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <Link href="/" className="font-mono text-neon hover:text-white transition-colors">
                    _ZERO_SUITE
                </Link>
                <div className="flex gap-4 text-sm font-mono text-gray-500">
                    <span>v1.0.0</span>
                    <span>STABLE</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* HERO */}
                <div className="mb-24 text-center">
                    <div className="inline-block px-3 py-1 mb-6 bg-white/5 rounded-full border border-white/10 text-neon text-xs font-mono">
                        {service.slug.toUpperCase()}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 max-w-4xl mx-auto">
                        {service.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {service.description}
                    </p>

                    <div className="mt-12 flex justify-center gap-6">
                        <Link href="#buy" className="bg-neon text-black font-bold px-8 py-4 hover:bg-white transition-colors">
                            GET LICENSE
                        </Link>
                        <Link href="#demo" className="border border-white/20 text-white px-8 py-4 hover:border-white transition-colors">
                            LIVE DEMO
                        </Link>
                    </div>
                </div>

                {/* FEATURES GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
                    {service.features.map((feature, i) => (
                        <FeatureBox key={i} title={feature} />
                    ))}
                </div>

                {/* COMPARISON */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold mb-8 text-center">BATTLE TESTED</h2>
                    <ComparisonTable
                        competitorName={service.comparison.competitorName}
                        competitorCons={service.comparison.competitorCons}
                        zeroAdvantages={service.comparison.zeroAdvantages}
                    />
                </section>

                {/* CONTACT CTA */}
                <section id="buy" className="bg-white/5 border border-white/10 p-12 text-center relative overflow-hidden">
                    {/* Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon/10 blur-[100px] pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-6">Ready to Deploy?</h2>
                        <p className="text-xl text-gray-400 mb-8">
                            One-time purchase. Unlimited usage. Source code ownership available for Enterprise.
                        </p>
                        <Link href="/contact" className="bg-neon text-black font-bold text-xl px-12 py-5 inline-block hover:scale-105 transition-transform">
                            CONTACT SALES
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    );
}
