import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-4">
      <div className="mb-8 p-4 border border-[var(--neon)] rounded-full bg-[rgba(57,255,20,0.05)] animate-pulse">
        <span className="text-[var(--neon)] text-sm font-bold tracking-widest">
          PROJECT ZERO : ONLINE
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-4xl">
        Self-Hosted Microservices. <br />
        <span className="text-[var(--neon)]">Zero Lock-In.</span>
      </h1>

      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
        Deploy production-ready auth, payments, and caching infrastructure on your own terms.
        No hidden fees. No data harvesting. 100% Code ownership.
      </p>

      <div className="flex gap-4 flex-col sm:flex-row">
        <Link
          href="/services"
          className="px-8 py-4 bg-white text-black font-bold hover:bg-gray-200 transition-colors rounded-sm"
        >
          VIEW SERVICES
        </Link>
        <Link
          href="/services"
          className="px-8 py-4 border border-white/20 hover:border-[var(--neon)] hover:text-[var(--neon)] transition-all rounded-sm"
        >
          READ MANIFESTO
        </Link>
      </div>
    </div>
  );
}
