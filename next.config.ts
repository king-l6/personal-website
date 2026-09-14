import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // better-sqlite3 loads a native binding at runtime and must not be bundled.
  serverExternalPackages: ["better-sqlite3"],
  images: {
    // Placeholder photography only. Drop your own files in /public/photos
    // and these entries can go.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
    ],
  },
}

export default nextConfig
