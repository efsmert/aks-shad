/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    /*
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },*/
};

module.exports = nextConfig;
