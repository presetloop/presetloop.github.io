/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // unoptimized: true,
    domains: ['presetloop.com', 'presetloops.com'],
  },
  // remove Download the React DevTools for a better development message
  //  webpack: (
  //     config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   config.plugins = [...config.plugins,
  //     new webpack.DefinePlugin({
  //       '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
  //     })
  //   ]
  //   // Important: return the modified config
  //   return config
  // },
}

module.exports = nextConfig
