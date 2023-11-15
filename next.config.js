/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  distDir: "docs",
  basePath: "/docs",
  assetPrefix: isProd ? "https://ach02raf.com" : undefined,
  reactStrictMode: true,
};

module.exports = nextConfig;
