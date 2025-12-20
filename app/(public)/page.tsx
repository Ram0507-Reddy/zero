import Link from 'next/link';
import { getAllServices } from '@/lib/services';
import ServiceBox from '@/components/ServiceBox';
import ArchitectureDemo from '@/components/ArchitectureDemo';
import { Shield, Zap, Box } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allServices = await getAllServices();

  // Core Services
  const coreSlugs = ['zero-media', 'zero-auth', 'zero-pay', 'zero-notify'];
  const coreServices = allServices.filter(s => coreSlugs.includes(s.slug));

  // Expansion Services
  const expansionServices = allServices.filter(s => !coreSlugs.includes(s.slug));

  return (
    <main className="min-h-screen bg-black text-white selection:bg-neon selection:text-black font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 border-b border-white/10 overflow-hidden text-center">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-block px-4 py-2 mb-8 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm shadow-lg">
            <span className="text-neon font-mono text-sm md:text-base tracking-widest font-bold">
              v1.0.0 STABLE RELEASE
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-tight">
            The <span className="text-neon">Privacy-First</span>,<br className="hidden md:block" /> Self-Hosted Suite.
          </h1>

          <p className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-12">
            Own your data. No hidden fees. <span className="text-white font-medium border-b-2 border-neon">0% Transaction Fees.</span><br />
            The developer-first gateway you've been waiting for.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link href="#products" className="bg-neon text-black text-xl font-bold px-12 py-5 rounded-md hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              VIEW MODULES
            </Link>
            <Link href="#contact" className="border-2 border-white/20 text-white text-xl font-bold px-12 py-5 rounded-md hover:bg-white/10 transition-colors">
              LIVE DEMO
            </Link>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </section>

      {/* 2. PROBLEM STATEMENT (With Icons) */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-b border-white/10 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-6 text-neon">
              <Zap size={48} />
            </div>
            <h3 className="text-white font-bold text-2xl mb-4">SaaS Fatigue?</h3>
            <p className="text-xl text-gray-400">Stop bleeding ₹20k+/month on scattered usage-based subscriptions like Auth0 and SendGrid.</p>
          </div>
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-6 text-neon">
              <Shield size={48} />
            </div>
            <h3 className="text-white font-bold text-2xl mb-4">Privacy Risk?</h3>
            <p className="text-xl text-gray-400">Your customer data shouldn't live on 3rd party servers. Keep it grounded on your infra.</p>
          </div>
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-6 text-neon">
              <Box size={48} />
            </div>
            <h3 className="text-white font-bold text-2xl mb-4">Vendor Lock-in?</h3>
            <p className="text-xl text-gray-400">If you stop paying, your app shouldn't break. Own your Docker containers forever.</p>
          </div>
        </div>
      </section>

      {/* 3. CORE PRODUCTS */}
      <section id="products" className="py-24 md:py-32 px-6 md:px-12 max-w-8xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">CORE INFRASTRUCTURE</h2>
          <p className="text-2xl text-gray-400">The essential building blocks for modern apps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service) => (
            <ServiceBox key={service.slug} {...service} />
          ))}
        </div>
      </section>

      {/* 4. EXPANSION PRODUCTS */}
      <section className="pb-32 px-6 md:px-12 max-w-8xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">EXPANSION UTILITIES</h2>
          <p className="text-2xl text-gray-400">Drop-in replacements for common SaaS tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expansionServices.map((service) => (
            <ServiceBox key={service.slug} {...service} />
          ))}
        </div>
      </section>

      {/* 5. ARCHITECTURE DEMO */}
      <ArchitectureDemo />

      {/* 6. CTA / FOOTER */}
      <section id="contact" className="py-32 px-6 md:px-12 border-t border-white/10 bg-zinc-900 text-center">
        <h2 className="text-5xl font-bold mb-8">Ready to go ZERO?</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Stop renting your tech stack. Buy it once, run it forever.
        </p>
        <Link href="/contact" className="bg-neon text-black font-bold text-xl px-12 py-5 inline-block hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)]">
          GET THE SUITE
        </Link>
      </section>
    </main>
  );
}
