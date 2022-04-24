module.exports = {
  presets: [
    [
      '@babel/env',
      process.env.BUILD_TARGET === 'module'
        ? {
            modules: false,
          }
        : {},
    ],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
  ],
};
