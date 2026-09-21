import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';

// Recompute at dev startup/build so replacing a portrait invalidates every
// optimized size, while unchanged photos keep their browser/CDN cache entries.
const photoDirectory = new URL('./public/brothers/', import.meta.url);
const brotherPhotoVersions = Object.fromEntries(
    readdirSync(photoDirectory, { withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name.endsWith('.webp'))
        .map(entry => [
            entry.name.slice(0, -5),
            createHash('sha256')
                .update(readFileSync(new URL(entry.name, photoDirectory)))
                .digest('hex')
                .slice(0, 16),
        ])
);

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BROTHER_PHOTO_VERSIONS: JSON.stringify(brotherPhotoVersions),
    },
    images: {
        qualities: [65, 75, 100],
        localPatterns: [
            { pathname: '/**', search: '' },
            { pathname: '/brothers/*.webp' },
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    // Optimize package imports for better build performance
    // This transforms barrel imports to direct imports at build time
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
};

export default nextConfig;
