import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // required for static export — no image optimization server available
  images: { unoptimized: true },
};

export default nextConfig;
