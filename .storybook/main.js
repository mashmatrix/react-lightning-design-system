const path = require('path');

module.exports = {
  stories: ['../stories/**/*Stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    'storycap',
  ],
};
