import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PWA y offline mode se configurarán con next-pwa
  reactStrictMode: true,

  // Optimizaciones de producción
  poweredByHeader: false,

  // Configuración de imágenes (si se usan fotos de productos)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.kameone.cl",
      },
    ],
    unoptimized: true, // Para demo sin backend de imágenes
  },

  // Ignorar errores de TypeScript en demo (server/ tiene tipos de Prisma)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Redirecciones
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
