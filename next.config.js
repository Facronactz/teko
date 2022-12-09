/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://teko.vercel.app'
      : 'http://localhost:3000',
  env: {
    STORAGE_URL: process.env.AWS_BUCKET_URL,
  },
  compiler: {
    styledComponents: true,
    // reactRemoveProperties: true,
    // removeConsole: true,
  },
  // poweredByHeader: false,
  // headers: async () => [
  //   {
  //     source: '/api/:path*',
  //     headers: [
  //       {
  //         key: 'Access-Control-Allow-Credentials',
  //         value: 'true',
  //       },
  //       {
  //         key: 'Access-Control-Allow-Origin',
  //         value: '*',
  //       },
  //       {
  //         key: 'Access-Control-Allow-Methods',
  //         value: 'GET,DELETE,POST,PUT',
  //       },
  //       {
  //         key: 'Access-Control-Allow-Headers',
  //         value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  //       },
  //       {
  //         key: 'X-Frame-Options',
  //         value: 'SAMEORIGIN',
  //       },
  //       {
  //         key: 'X-XSS-Protection',
  //         value: '1; mode=block',
  //       },
  //       {
  //         key: 'X-Content-Type-Options',
  //         value: 'nosniff',
  //       },
  //     ],
  //   },
  // ],
  images: {
    domains: [
      'teko.vercel.app',
      'tekostorage.s3-ap-southeast-1.amazonaws.com',
      'tekostorage.s3.ap-southeast-1.amazonaws.com',
    ],
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
