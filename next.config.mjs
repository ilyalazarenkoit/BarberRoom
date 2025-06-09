/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Отключаем серверные компоненты для ускорения сборки
  experimental: {
    dynamicIO: false,
    authInterrupts: true,
    useCache: true,
    serverComponentsExternalPackages: [],
  },
  // Оптимизации для Vercel
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  // Увеличиваем таймаут для сборки
  staticPageGenerationTimeout: 60,
  // Оптимизируем кэширование
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
