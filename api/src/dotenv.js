const dotenv = require('dotenv');
const path = require('path');

const environment = process.env.ENVIRONMENT;
const dotenvPath = environment
  ? path.resolve(__dirname, `../../.env.${environment}`)
  : path.resolve(__dirname, '../../.env');

module.exports = dotenv.config({ path: dotenvPath }).parsed;
