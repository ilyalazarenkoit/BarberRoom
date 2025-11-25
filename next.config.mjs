/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable server components to speed up build
  experimental: {
    dynamicIO: false,
    authInterrupts: true,
    useCache: true,
    serverComponentsExternalPackages: [],
  },
  // Optimizations for Vercel
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  // Increase build timeout
  staticPageGenerationTimeout: 60,
  // Optimize caching
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(.*\\.(js|css|jpg|jpeg|png|svg|webp))",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
