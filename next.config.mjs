/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
export default {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  async headers() { return [{ source: "/(.*)", headers: securityHeaders }]; },
};
