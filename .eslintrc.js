module.exports = {
  extends: ['airbnb'],
  rules: {
    semi: 'error',
    'no-unused-expressions': 'off',
    'global-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
  },
};
