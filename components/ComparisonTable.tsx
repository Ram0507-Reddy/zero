interface ComparisonProps {
    competitorName: string;
    competitorCons: string[];
    zeroAdvantages: string[];
}

export default function ComparisonTable({ competitorName, competitorCons, zeroAdvantages }: ComparisonProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {/* Competitor / Bad Side */}
            <div className="bg-black p-8">
                <h3 className="text-red-500 font-mono text-xl mb-6 uppercase">VS {competitorName}</h3>
                <ul className="space-y-4">
                    {competitorCons.map((con, i) => (
                        <li key={i} className="flex items-start text-gray-400">
                            <span className="text-red-500 mr-3">✕</span>
                            {con}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Zero / Good Side */}
            <div className="bg-black p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-neon text-black text-xs font-bold px-3 py-1 font-mono uppercase">
                    Zero Suite
                </div>
                <h3 className="text-neon font-mono text-xl mb-6 uppercase">WHY ZERO?</h3>
                <ul className="space-y-4">
                    {zeroAdvantages.map((pro, i) => (
                        <li key={i} className="flex items-start text-white">
                            <span className="text-neon mr-3">✓</span>
                            {pro}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
