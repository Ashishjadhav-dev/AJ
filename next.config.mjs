/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/Ashish_Jadhav_Full_Stack.pdf",
        destination: "/documents/ashish-jadhav-resume.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
