import axios from 'axios';
import cheerio from 'cheerio';
import moment from 'moment';

/**
 * This function scrapes a user's commit history.
 * @param {*} param0
 */
export default async function scrapeCommitHistory({ username }) {
  const pageUrl = `https://github.com/${username}`;
  const response = await axios.get(pageUrl);
  const $ = cheerio.load(response.data);
  const output = [];

  for (let x = 1; x <= 53; x++) {
    for (let y = 1; y <= 7; y++) {
      const val = $(
        '#js-pjax-container > div > div.col-9.float-left.pl-2 > div.position-relative > div.mt-4.position-relative > div.js-yearly-contributions > div > div > div.js-calendar-graph.is-graph-loading.graph-canvas.calendar-graph.height-full > svg > g >' +
          ` g:nth-child(${x}) > rect:nth-child(${y})`
      );
      const date = val.attr('data-date');
      const count = val.attr('data-count');

      if (date && count) {
        output.push({ date: moment(date), count });
      }
    }
  }
  return output;
}
