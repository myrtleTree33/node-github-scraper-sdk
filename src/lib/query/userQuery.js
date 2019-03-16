import cheerio from 'cheerio';
import axios from 'axios';

/**
 * Find a keyword, and scrape a group of repos.
 * @param {*} query
 * @param {*} page
 */
export default async function scrapeUsersByKeyword(query, page) {
  const results = [];
  const url = `https://github.com/search?p=${page}&q=${query}&type=Users`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const entries = $('#user_search_results > div.user-list > div');

  entries.each((i, entry) => {
    const entryHtml = cheerio.load($(entry).html());
    const text = entryHtml('div > a')
      .text()
      .replace(/(\r\n|\n|\r| )/gm, '');
    results.push(text);
  });

  return results;
}
