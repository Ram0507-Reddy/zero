import Link from 'next/link';
// import { ArrowRight } from 'lucide-react'; 

interface ServiceBoxProps {
    slug: string;
    name: string;
    description: string;
    isCore?: boolean;
}

export default function ServiceBox({ slug, name, description, isCore = false }: ServiceBoxProps) {
    return (
        <Link href={`/services/${slug}`} className={`group block h-full bg-black border border-white/10 p-6 hover:border-neon transition-all duration-300 relative overflow-hidden ${isCore ? 'col-span-1 md:col-span-2 row-span-2' : ''}`}>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <h3 className={`font-mono font-bold mb-2 group-hover:text-neon ${isCore ? 'text-2xl' : 'text-lg'}`}>
                        {name}
                    </h3>
                    <p className={`text-gray-400 font-sans ${isCore ? 'text-base' : 'text-sm line-clamp-3'}`}>
                        {description}
                    </p>
                </div>

                <div className="mt-4 flex items-center text-neon text-xs font-mono opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    VIEW DETAILS <span className="ml-2">→</span>
                </div>
            </div>
        </Link>
    );
}
