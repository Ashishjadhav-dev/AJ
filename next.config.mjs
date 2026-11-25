/** @type {import('next').NextConfig} */
const nextConfig = {
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
