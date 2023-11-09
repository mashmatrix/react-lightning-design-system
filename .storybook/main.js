const path = require('path');

module.exports = {
  typescript: {
    reactDocgen: "react-docgen-typescript-plugin"
  },
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    'storycap',
  ],
};
