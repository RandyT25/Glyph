import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/Glyph",
  assetPrefix: "/Glyph",
};

export default nextConfig;
