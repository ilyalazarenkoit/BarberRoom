/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during builds to speed up deployment
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "test-ores.ninoxdb.de",
        port: "",
        pathname: "/share/**",
      },
      {
        protocol: "https",
        hostname: "be.dev.photovate.de",
        port: "",
        pathname: "/share/**",
      },
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
        port: "",
        pathname: "/pngs/**",
      },
    ],
    unoptimized: true, // Skip image optimization during build to speed up deployment
  },
  poweredByHeader: false,
  reactStrictMode: false, // Disable strict mode for production builds
  compress: true,
  // Increase timeout for static generation
  staticPageGenerationTimeout: 180,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Simplified headers
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(.*\\.js)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(.*\\.css)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/images/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
