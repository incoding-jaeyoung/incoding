module.exports = {
  // reactStrictMode: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'incodingco.mycafe24.com',
      },
    ],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@14islands/r3f-scroll-rig'],
};
