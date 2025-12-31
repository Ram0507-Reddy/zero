import Link from 'next/link';
import { getAllServices } from '@/lib/services';
// import { getLandingContent } from '@/lib/content'; // Detached from global CMS for now
import ServiceBox from '@/components/ServiceBox';
import ArchitectureDemo from '@/components/ArchitectureDemo';
import { Shield, Zap, Box } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allServices = await getAllServices();

  const content = {
    hero: {
      badge: "ENTERPRISE GRADE",
      title: "Zero Deployment\nArchitecture",
      subtitle: "Complete sovereignty over your infrastructure.\nDeploy the full suite in minutes.",
      ctaPrimary: "Explore Services",
      ctaSecondary: "Contact Sales"
    },
    problems: {
      title1: "0ms Latency",
      desc1: "Deployed on your local edge or private cloud for instant response.",
      title2: "100% Security",
      desc2: "Air-gapped compatible. No external dependencies or telemetry.",
      title3: "Full Ownership",
      desc3: "You own the data, the code, and the keys. No vendor lock-in."
    },
    sections: {
      coreTitle: "Core Services",
      coreDesc: "Essential infrastructure for secure operations.",
      expansionTitle: "Expansion Modules",
      expansionDesc: "Specialized tools for specific mission requirements.",
      ctaFooterTitle: "Ready to Deploy?",
      ctaFooterDesc: "Get your license key and start your deployment today.",
      ctaFooterButton: "Get Started"
    }
  };

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
          <div className="inline-block px-4 py-2 mb-8 border border-white/20 rounded-full bg-white/5 shadow-lg">
            <span className="text-neon font-mono text-sm md:text-base tracking-widest font-bold">
              {content.hero.badge}
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-tight whitespace-pre-wrap">
            {content.hero.title}
          </h1>

          <p className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-12 whitespace-pre-wrap">
            {content.hero.subtitle}
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link href="#products" className="bg-neon text-black text-xl font-bold px-12 py-5 rounded-md hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              {content.hero.ctaPrimary}
            </Link>
            <Link href="#contact" className="border-2 border-white/20 text-white text-xl font-bold px-12 py-5 rounded-md hover:bg-white/10 transition-colors">
              {content.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Background Pattern */}
      </section>

      {/* 2. PROBLEM STATEMENT (With Icons) */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-b border-white/10 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-6 text-neon">
              <Zap size={48} />
            </div>
            <h3 className="text-white font-bold text-2xl mb-4">{content.problems.title1}</h3>
            <p className="text-xl text-gray-400">{content.problems.desc1}</p>
          </div>
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-6 text-neon">
              <Shield size={48} />
            </div>
            <h3 className="text-white font-bold text-2xl mb-4">{content.problems.title2}</h3>
            <p className="text-xl text-gray-400">{content.problems.desc2}</p>
          </div>
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-6 text-neon">
              <Box size={48} />
            </div>
            <h3 className="text-white font-bold text-2xl mb-4">{content.problems.title3}</h3>
            <p className="text-xl text-gray-400">{content.problems.desc3}</p>
          </div>
        </div>
      </section>

      {/* 3. CORE PRODUCTS */}
      <section id="products" className="py-24 md:py-32 px-6 md:px-12 max-w-8xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">{content.sections.coreTitle}</h2>
          <p className="text-2xl text-gray-400">{content.sections.coreDesc}</p>
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">{content.sections.expansionTitle}</h2>
          <p className="text-2xl text-gray-400">{content.sections.expansionDesc}</p>
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
        <h2 className="text-5xl font-bold mb-8">{content.sections.ctaFooterTitle}</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          {content.sections.ctaFooterDesc}
        </p>
        <Link href="/dashboard/contact" className="bg-neon text-black font-bold text-xl px-12 py-5 inline-block hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)]">
          {content.sections.ctaFooterButton}
        </Link>
      </section>
    </main>
  );
}
