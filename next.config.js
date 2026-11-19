/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  distDir: process.env.NEXT_DIST_DIR || "docs",
  reactStrictMode: true,
  images: {
    domains: ["ach02raf.pro"],
    path: "/",
    unoptimized: true,
  },
};

module.exports = nextConfig;
