/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
  images: {
    domains: ["www.google.com"],
  },
};

export default withPWA({
  dest: "public",
})(nextConfig);
