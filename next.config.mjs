/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  agentRules: false,
  images: {
    qualities: [75, 84, 86, 88]
  },
  // The questionnaire pages were merged into the customer request pages.
  async redirects() {
    return [
      { source: "/en/esg-questionnaire-support", destination: "/en/esg-customer-requests", permanent: true },
      { source: "/de/esg-fragebogen-lieferanten", destination: "/de/esg-kundenanfragen", permanent: true }
    ];
  }
};

export default nextConfig;
