const _ = require('lodash');
const request = require('request');

const BASE_URL = 'http://api.walkscore.com/score';

/**
 * https://www.walkscore.com/professional/api-sample-code.php
 */
class Walkscore {
  /**
   * @param {Object} config
   */
  constructor(config) {
    if (!config.apiKey) throw new Error('config.apiKey is required');
    const wsapikey = config.apiKey;

    this.baseConfig = {
      format: 'json',
      wsapikey,
      transit: 1,
      bike: 1,
      ..._.omit(config, ['apiKey']),
    };
  }

  /**
   * get walkscore of a specified coordinate
   *
   * @param {number} lat
   * @param {number} lng
   * @return {Promise<Object>}
   */
  async get(lat, lng) {
    const config = _.pickBy({
      ...this.baseConfig,
      lat,
      lon: lng,
    });
    const queryParams = _.map(config, (value, key) => `${key}=${value}`).join('&');
    const url = `${BASE_URL}?${queryParams}`;

    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) return reject(error);
        return resolve(JSON.parse(body));
      });
    });
  }
}

module.exports = Walkscore;
