const _ = require('lodash');
const puppeteer = require('puppeteer');
const Cache = require('./Cache');

const VACANCY_URL = 'https://sqmresearch.com.au/graph_vacancy.php?postcode=';
const VACANCY_KEY_PREFIX = 'VACANCY_RATES';

class SqmResearch {
  async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch();
    }

    return this.browser;
  }

  async openUrl(url) {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    await page.goto(url);

    return page;
  }

  async getVacancyRate(postCode) {
    const cachedValue = Cache.get(`${VACANCY_KEY_PREFIX}.${postCode}`);
    if (cachedValue) return cachedValue;

    const page = await this.openUrl(`${VACANCY_URL}${postCode}`);

    const chartData = await page.evaluate(() => {
      const $ = window.$;
      const chart = $('#hichartcontainer').highcharts();

      return chart.options.series;
    });
    await page.close();

    // only get the latest data
    const latestData = _(chartData)
      .map(({ name, data }) => {
        const latest = _.last(data);
        return [name, { timestamp: latest[0], data: latest[1] }];
      })
      .fromPairs()
      .value();

    Cache.set(`${VACANCY_KEY_PREFIX}.${postCode}`, latestData);
    return latestData;
  }
}

module.exports = SqmResearch;
