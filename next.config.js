/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  distDir: "docs",
  reactStrictMode: true,
  images: {
    domains: ["ach02raf.com"],
    loader: "akamai",
    path: "/",
  },
};

module.exports = nextConfig;
