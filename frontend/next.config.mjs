/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    maximumDiskCacheSize: 50_000_000,
  },
};

export default nextConfig;
