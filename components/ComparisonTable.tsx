import { Service } from "@/lib/services";

export default function ComparisonTable({ comparison }: { comparison: Service['comparison'] }) {
    return (
        <div className="w-full mt-10 border border-white/10 rounded-sm overflow-hidden">
            <div className="grid grid-cols-2 text-sm font-mono border-b border-white/10">
                <div className="p-4 bg-red-950/20 text-red-400 border-r border-white/10 font-bold">
                    VS {comparison.competitorName}
                </div>
                <div className="p-4 bg-[rgba(57,255,20,0.05)] text-[var(--neon)] font-bold">
                    ZERO SUITE
                </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-white/10">
                <div className="p-6 space-y-4 bg-red-950/10">
                    {comparison.competitorCons.map((con, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-400">
                            <span className="text-red-500">✕</span>
                            {con}
                        </div>
                    ))}
                </div>

                <div className="p-6 space-y-4 bg-[rgba(57,255,20,0.02)]">
                    {comparison.zeroAdvantages.map((adv, i) => (
                        <div key={i} className="flex items-center gap-3 text-white">
                            <span className="text-[var(--neon)]">✓</span>
                            {adv}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
