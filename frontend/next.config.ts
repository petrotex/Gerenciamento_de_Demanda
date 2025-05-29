import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      '127.0.0.1',       // Para desenvolvimento local
      'localhost',        // Alternativa ao IP
      'seu-backend.com'   // Domínio de produção
    ],
  },
};

export default nextConfig;
