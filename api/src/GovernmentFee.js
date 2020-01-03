const _ = require('lodash');
const puppeteer = require('puppeteer');
const config = require('./dotenv');
const { purifyNumber } = require('../../common/helpers/number');

const URL = `${config.APP_ENDPOINT}/stamp-duty.html`;

const STATE_MAPPER = {
  ACT: 'ACT',
  NSW: 'New South Wales',
  NT: 'Northern Territory',
  QLD: 'Queensland',
  SA: 'South Australia',
  TAS: 'Tasmania',
  VIC: 'Victoria',
  WA: 'Western Australia',
};

class GovernmentFee {
  static async getGovernmentFee(options) {
    const mappedOptions = _.defaults(options, {
      isInvestment: true,
      isFirstHomeBuyer: false,
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(URL);
    await page.addScriptTag({ path: require.resolve('jquery') });

    const governmentFees = await page.evaluate((stateMapper, { state, price, isInvestment, isFirstHomeBuyer }) => {
      const $ = window.$;

      // update state
      $('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-dropdown').click();
      $('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-dropdown__values')
        .find(`li:contains('${stateMapper[state]}')`)
        .click();

      // update price
      $('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-TextField').focus();
      $('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-TextField').val(price);
      $('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-TextField').blur();

      // update property type
      // default toggle value is primary residence
      if (isInvestment) {
        $('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-toggle__option--two[value="Investment Property"]').click();
      }

      // update is first home buyer
      // default toggle is first home buyer
      if (!isFirstHomeBuyer) {
        $('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-toggle__option--one[value="No"]').click();
      }

      // get all fees
      const fees = {};
      $('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-breakdown__fee').each((index, el) => {
        const label = $(el).find('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-breakdown__fee__title').text();
        fees[label] = $(el).find('.reavicalc_calculator_modernstampduty_homeloans_nab_badge-breakdown__fee__price').text();
      });

      return fees;
    }, STATE_MAPPER, mappedOptions);
    await browser.close();

    return _.mapValues(governmentFees, purifyNumber);
  }
}

module.exports = GovernmentFee;
