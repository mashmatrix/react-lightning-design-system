module.exports = {
  'parser': '@typescript-eslint/parser',
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'prettier',
  ],
  'plugins': [
    '@typescript-eslint',
    'jsx-a11y',
    'prettier',
    'react-hooks',
  ],
  'parserOptions': {
    'sourceType': 'module',
    'project': './tsconfig.json',
  },
  'env': {
    'browser': true
  },
  'rules': {
    // temp disabled - start
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-unsafe-assignment': 1,
    '@typescript-eslint/no-unsafe-argument': 1,
    '@typescript-eslint/no-unsafe-member-access': 1,
    '@typescript-eslint/no-unsafe-call': 1,
    '@typescript-eslint/no-unsafe-return': 1,
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/restrict-template-expressions': 1,
    '@typescript-eslint/unbound-method': 1,
    '@typescript-eslint/no-non-null-assertion': 1,
    '@typescript-eslint/restrict-plus-operands': 1,
    '@typescript-eslint/no-empty-function': 1,
    'react/prop-types': 1,
    'react/display-name': 1,
    'react/no-deprecated': 1,
    // tmp disabled - end
    'prettier/prettier': 2,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
  }
};
