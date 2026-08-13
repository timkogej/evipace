/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  agentRules: false,
  images: {
    qualities: [75, 84, 86, 88]
  }
};

export default nextConfig;
