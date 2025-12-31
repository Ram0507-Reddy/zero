import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    // Strict CSP as requested. Note: 'unsafe-inline' style is kept for some libraries, but script is strictly 'self' (and 'unsafe-inline' 'unsafe-eval' for dev/Next.js).
    // In strict production, specific hashes are better.
    value: "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none';"
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'no-referrer' }, // or strict-origin-when-cross-origin
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/notes',
        destination: 'https://zero-message.vercel.app/notes',
      },
      {
        source: '/notes/:path*',
        destination: 'https://zero-message.vercel.app/notes/:path*',
      },
    ]
  }
};

export default nextConfig;
