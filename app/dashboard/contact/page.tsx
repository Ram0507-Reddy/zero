import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon selection:text-black font-sans">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">

                {/* Back Link */}
                <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white mb-12 text-sm font-mono tracking-wider transition-colors">
                    ← RETURN TO BASE
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Context */}
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            Start Your <span className="text-neon">Migration</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed mb-12">
                            Stop renting your infrastructure. Tell us about your stack, and we'll design a self-hosted Zero Suite architecture for you.
                        </p>

                        <div className="space-y-8">
                            <div className="p-6 border border-white/10 rounded-lg bg-zinc-900/50">
                                <h3 className="text-white font-bold mb-2">Technical Sales</h3>
                                <p className="text-gray-400 mb-4">Direct usage questions and architecture reviews.</p>
                                <a href="mailto:sales@zero-s.tech" className="text-neon font-mono hover:underline">sales@zero-s.tech</a>
                            </div>

                            <div className="p-6 border border-white/10 rounded-lg bg-zinc-900/50">
                                <h3 className="text-white font-bold mb-2">Enterprise Support</h3>
                                <p className="text-gray-400 mb-4">SLA contracts and custom module development.</p>
                                <a href="mailto:support@zero-s.tech" className="text-neon font-mono hover:underline">support@zero-s.tech</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
