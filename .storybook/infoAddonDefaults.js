export default {
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
