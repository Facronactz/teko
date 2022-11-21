/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://teko.vercel.app' : 'http://localhost:3000',
  compiler: {
    styledComponents: true,
    reactRemoveProperties: true,
    removeConsole: true,
  },
  experimental: {
    appDir: true,
    modularizeImports: {
      'react-bootstrap': {
        transform: 'react-bootstrap/{{member}}',
      },
      'components/?(((\\w*)?/?)*)': {
        transform: 'components/{{ matches.[1] }}/{{member}}',
      },
    },
  },
};

module.exports = nextConfig;
