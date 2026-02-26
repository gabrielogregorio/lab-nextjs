import type { NextConfig } from 'next';

// const withBundleAnalyzer = import('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/rewrite-routes/dashboard',
        destination: '/rewrite-routes/dashboard/default', // não muda a rota para /default no navegador
      },
      // Rewrite com parâmetros dinâmicos:
      // { source: "/blog/:slug", destination: "/posts/:slug" },

      // Rewrite com header condicional
      // { source: "/api/:path*", has: [{ type: "header", key: "x-custom" }], destination: "..." },
    ];
  },

  images: {
    // loader: 'custom',
    // loaderFile: './src/lib/image-loader.js',
    remotePatterns: [new URL('https://picsum.photos/**'), new URL('https://images.unsplash./**com')],
  },

  // experimental: {
  //   ppr: true,
  // },
};

// export default withBundleAnalyzer(nextConfig);
export default nextConfig;
