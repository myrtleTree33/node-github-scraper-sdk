import cheerio from 'cheerio';
import axios from 'axios';

/**
 * Find a keyword, and scrape a group of repos.
 * @param {*} query
 * @param {*} page
 */
export default async function scrapeReposByKeyword(query, page) {
  const results = [];
  const url = `https://github.com/search?p=${page}&q=${query}&type=Repositories`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const entries = $(
    '#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li'
  );

  entries.each((i, entry) => {
    const entryHtml = cheerio.load($(entry).html());
    const text = entryHtml('h3 > a').text();
    results.push(text);
  });

  return results;
}
