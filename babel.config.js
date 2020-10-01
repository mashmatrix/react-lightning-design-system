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
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
  ],
};
