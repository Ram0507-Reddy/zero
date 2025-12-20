export default function FeatureBox({ title }: { title: string }) {
    return (
        <div className="bg-white/5 border border-white/10 p-4 rounded hover:border-neon/50 transition-colors">
            <div className="text-neon mb-2 text-xl">⚡</div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-white">{title}</h4>
        </div>
    );
}
