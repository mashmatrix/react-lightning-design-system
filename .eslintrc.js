module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  'env': {
    'browser': true
  },
  'rules': {
    'no-nested-ternary': 0,
    'react/no-multi-comp': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'jsx-a11y/no-static-element-interactions': 0,
    'class-methods-use-this': 0,
    'react/no-unused-prop-types': 1,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'jsx-a11y/label-has-for': 1,

    'no-await-in-loop': 0,
    'no-restricted-syntax': [2,
      {
        'selector': 'ForInStatement',
        'message': 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
      },
      {
        'selector': 'LabeledStatement',
        'message': 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
      },
      {
        'selector': 'WithStatement',
        'message': '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
      }
    ],
    'no-return-assign': [2, 'except-parens'],

    // TODO: Fix or disable
    'react/require-default-props': 1,
    'react/destructuring-assignment': 0,
    'react/no-find-dom-node': 1,
    'react/no-array-index-key': 2,
    'react/button-has-type': 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/no-noninteractive-tabindex': 1,
    'jsx-a11y/role-has-required-aria-props': 1,
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/interactive-supports-focus': 1,
    'jsx-a11y/label-has-associated-control': 1
  }
};
