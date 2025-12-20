import { getServiceBySlug } from "@/lib/services";
import ComparisonTable from "@/components/ComparisonTable";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 0; // Dynamic

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service || !service.enabled) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/services" className="text-sm text-gray-500 hover:text-[var(--neon)] mb-4 block">
                    ← BACK TO FLEET
                </Link>
                <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-5xl font-bold text-white">{service.name}</h1>
                    <span className="px-3 py-1 bg-[var(--neon)] text-black text-xs font-bold uppercase">
                        v1.0.0 STABLE
                    </span>
                </div>
                <p className="text-xl text-gray-400 max-w-2xl">{service.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-lg font-bold text-[var(--neon)] mb-4 border-b border-white/10 pb-2">
                            CORE CAPABILITIES
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-300">
                                    <span className="w-1.5 h-1.5 bg-[var(--neon)] rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-[var(--neon)] mb-4 border-b border-white/10 pb-2">
                            WHY CHOOSE {service.name.toUpperCase()}?
                        </h2>
                        <ul className="space-y-2">
                            {service.pros.map((pro, i) => (
                                <li key={i} className="text-gray-300">
                                    <span className="text-[var(--neon)] mr-2">»</span> {pro}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="bg-white/5 p-6 border border-white/10 h-fit">
                    <h3 className="text-xl font-bold mb-4">DEPLOYMENT</h3>
                    <p className="text-sm text-gray-400 mb-6">
                        Get plain binary or Docker container. License key required for production use.
                    </p>
                    <button className="w-full py-3 bg-[var(--neon)] text-black font-bold hover:bg-[#2bc90e] transition-colors mb-4">
                        CONTACT FOR LICENSE
                    </button>
                    <div className="text-xs text-gray-500 font-mono">
                        <div>DOCKER PULL zero/{service.slug}</div>
                        <div>SHA256: e3b0c44298fc1c...</div>
                    </div>
                </div>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-6">COMPETITIVE ANALYSIS</h2>
                <ComparisonTable comparison={service.comparison} />
            </section>
        </div>
    );
}
