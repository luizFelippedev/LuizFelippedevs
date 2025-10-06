const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // 👇 ADICIONE ESTE NOVO BLOCO 👇
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },
      { // Adiciona o 'i.imgur.com' também, pois é de onde as imagens diretas são servidas
        protocol: 'https',
        hostname: 'i.imgur.com',
      }
    ],
  },
};

module.exports = withNextIntl(nextConfig);