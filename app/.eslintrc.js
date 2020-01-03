const _ = require('lodash');
const baseConfig = require('../.eslintrc');

module.exports = _.merge({}, baseConfig, {
  env: {
    jest: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
  ],
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
});
