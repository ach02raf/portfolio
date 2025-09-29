/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "export",
  distDir: "docs",
  reactStrictMode: true,
  images: {
    domains: ["ach02raf.pro"],
    path: "/",
    unoptimized: true,
  },
};

module.exports = nextConfig;
