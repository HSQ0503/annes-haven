import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host
  : "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
  async redirects() {
    return [
      // Strategic Entrepreneurship page retired (Oct 2026); program lives on Current Programs.
      {
        source: "/strategic-entrepreneurship",
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/strategic-entrepreneurship/:path*",
        destination: "/workshops",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
