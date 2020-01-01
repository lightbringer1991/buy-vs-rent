const _ = require('lodash');
const puppeteer = require('puppeteer');

const VACANCY_URL = 'https://sqmresearch.com.au/graph_vacancy.php?postcode=';

class SqmResearch {
  async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
      });
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
    const page = await this.openUrl(`${VACANCY_URL}${postCode}`);

    const chartData = await page.evaluate(() => {
      const $ = window.$;
      const chart = $('#hichartcontainer').highcharts();

      return chart.options.series;
    });
    await this.browser.close();

    // only get the latest data
    return _(chartData)
      .map(({ name, data }) => {
        const latest = _.last(data);
        return [name, { timestamp: latest[0], data: latest[1] }];
      })
      .fromPairs()
      .value();
  }
}

module.exports = SqmResearch;
