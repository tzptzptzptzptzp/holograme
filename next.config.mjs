/** @type {import('next').NextConfig} */

import { createRequire } from "module";

// next-pwa@2 は CJS の単一関数 export。ESM では createRequire が確実。
const require = createRequire(import.meta.url);
const withPWA = require("next-pwa");

const nextConfig = {
  // next-pwa@2: オプションは nextConfig.pwa にまとめる（旧 withPWA({...})(cfg) とは非互換）
  pwa: {
    dest: "public",
    register: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-static-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
          },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "images-cache",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30日
          },
        },
      },
      {
        urlPattern: /\/api\/.*/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24, // 1日
          },
        },
      },
    ],
  },

  // 画像最適化
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  // パフォーマンス最適化
  experimental: {
    optimizePackageImports: ["@emoji-mart/react", "@emoji-mart/data"],
  },

  // バンドル最適化
  webpack: (config, { dev, isServer }) => {
    // 本番環境でのバンドル分析（環境変数 ANALYZE=true で有効）
    if (!dev && !isServer && process.env.ANALYZE === "true") {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
        }),
      );
    }

    return config;
  },

  // 静的生成の最適化
  output: "standalone",

  // リダイレクトとリライト
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default withPWA(nextConfig);
