import Link from 'next/link';
import { Service } from '@/lib/services';

export default function ServiceCard({ service }: { service: Service }) {
    if (!service.enabled) return null;

    return (
        <Link href={`/services/${service.slug}`} className="block group">
            <div className="h-full p-6 border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--neon)] group-hover:shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--neon)] transition-colors">
                    {service.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {service.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white/10 text-gray-300 rounded border border-white/5">
                            {feature}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
