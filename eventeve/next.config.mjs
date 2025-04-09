/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "eventeve.onrender.com",
          pathname: "/images/**",
        },
      ],
    },
  };
  
  export default nextConfig;
  