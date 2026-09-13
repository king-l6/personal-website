import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography only. Drop your own files in /public/photos
    // and these entries can go.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
}

export default nextConfig
