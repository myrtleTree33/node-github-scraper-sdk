import axios from 'axios';
import sleep from 'await-sleep';

import { genToken, genTokenHeader } from '../auth/keyRetrieval';

async function scrapePage(username, page) {
  const token = await genToken();

  const pageUrl =
    'https://api.github.com/users/' + `${username}/followers?page=${page}`;

  const response = await axios.get(pageUrl, genTokenHeader(token));
  const entries = response.data;
  const followers = entries.map(x => {
    return {
      id: x.id,
      login: x.login
    };
  });
  return followers;
}

/**
 * This method scrapes a user's followers.
 * @param {*} param0
 */
export default async function scrapeFollowers(params) {
  const { username, maxPages = 5 } = params;
  const promises = [];
  for (let page = 1; page <= maxPages; page++) {
    promises.push(await scrapePage(username, page));
    await sleep(20);
  }

  const results = await Promise.all(promises);
  const followers = [].concat(...results);
  return followers;
}
