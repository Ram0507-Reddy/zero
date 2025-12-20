import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            // Basic safe CSP. Allows scripts from self for Next.js.
            // 'unsafe-inline' and 'unsafe-eval' often needed for dev/Next.js dynamic bits, 
            // but for strict production, we'd want 'self'. Sticking to a safe baseline that doesn't break App Router.
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
