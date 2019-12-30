const _ = require('lodash');
const axios = require('axios');

const LISTING_URI = 'https://services.realestate.com.au/services/listings';
const SEARCH_URI = 'https://services.realestate.com.au/services/listings/summaries/search';

class RealEstate {
  static async getListingData(id) {
    const url = `${LISTING_URI}/${id}`;
    const { data } = await axios.get(url);

    // filter to just the data we need
    return _.pick(data, [
      'lister',
      '_links',
      'constructionStatus',
      'description',
      'title',
      'features',
      'landSize',
      'price',
      'propertyType',
      'contentType',
      'images',
      'address',
      'channel',
      'propertyFeatures',
      'listingId',
      'statementOfInformation',
      'isHouseAndLandPackage',
      'modifiedDate',
      'generalFeatures',
    ]);
  }

  /**
   * @param {string} location             e.g. 'Broadmeadows, VIC 3047'
   * @param {boolean} isSold
   * @return {Promise<Object>}
   */
  static async getPropertiesAtLocation(location, isSold = false) {
    const query = {
      channel: isSold ? 'sold' : 'buy',
      filters: {
        surroundingSuburbs: true,
        excludeTier2: true,
        geoPrecision: 'address',
        excludeAddressHidden: false,
        localities:[{ searchLocation: location }],
      },
      pageSize: 500,
    };
    const url = `${SEARCH_URI}?query=${JSON.stringify(query)}`;
    const { data } = await axios.get(url);

    return data;
  }
}

module.exports = RealEstate;
