/** @type {import('next').NextConfig} */
const withPreact = require("next-plugin-preact");

const nextConfig = withPreact({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
