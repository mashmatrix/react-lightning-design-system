import infoAddon from '@storybook/addon-info';

const defaultOptions = {
  inline: true,
  styles(stylesheet) {
    return {
      ...stylesheet,
      jsxInfoContent: {
        borderTop: '1px solid rgb(238, 238, 238)',
        marginTop: '25px',
      },
      infoPage: {
        padding: '16px',
      },
      infoContent: {
        marginTop: '10px',
        borderTop: '1px solid rgb(238, 238, 238)',
        padding: '16px 0',
      },
    };
  },
};

export default {
  addWithInfo(storyName, info, storyFn, options) {
    return infoAddon.addWithInfo.call(this, storyName, info, storyFn, { ...defaultOptions, ...options });
  },
};
