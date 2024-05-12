/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "m.media-amazon.com",
          // port: "",
          // pathname: "/account123/**",
        },
        {
          protocol: "http",
          hostname: "127.0.0.1",
        },
        {
          protocol: "https",
          hostname: "www.thesun.co.uk",
        },
        {
          protocol: "https",
          hostname: "images.hindustantimes.com",
        },
        {
          protocol: "https",
          hostname: "www.hindustantimes.com",
        },
        {
          protocol: "https",
          hostname: "www.ft.com",
        },
        {
          protocol: "https",
          hostname: "example.com"
        },
      ],
    },
  };
  
//   module.exports = nextConfig;

export default nextConfig