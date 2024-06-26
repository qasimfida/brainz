/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.pixabay.com",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
