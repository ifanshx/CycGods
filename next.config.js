/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io"], // Add 'ipfs.io' to the list of allowed domains
  },
};

module.exports = nextConfig;
