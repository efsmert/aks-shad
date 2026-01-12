import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Uncomment the line below if deploying to a subdirectory (e.g., efsmert.github.io/aks-shad)
  // basePath: '/aks-shad',
};

export default nextConfig;
