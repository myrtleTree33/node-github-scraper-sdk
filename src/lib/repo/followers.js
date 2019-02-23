import axios from 'axios';
import cheerio from 'cheerio';
import sleep from 'await-sleep';

async function scrapeStarPage(repository, page) {
  const pageUrl = `https://github.com/${repository}/stargazers?page=${page}`;

  if (page === 0) {
    return []; // ignore page 0
  }

  let users = [];
  const response = await axios.get(pageUrl);
  console.log(`Retrieving page=${page} pageUrl=${pageUrl}..`);

  return new Promise((resolve, reject) => {
    const $ = cheerio.load(response.data);
    const entries = $('#repos > ol > li');
    entries.each((i, elem) => {
      const entryHtml = cheerio.load($(elem).html());

      const handle = entryHtml(
        'div.follower-list-align-top.d-inline-block.ml-3 > h3 > span > a'
      )
        .attr('href')
        .substr(1);

      const dateJoined = entryHtml(
        'div.follower-list-align-top.d-inline-block.ml-3 > p'
      ).text();

      const country = entryHtml(
        'div.follower-list-align-top.d-inline-block.ml-3 > p > span'
      ).html();

      users.push({
        handle,
        dateJoined,
        country
      });
    });
    resolve(users);
  });
}

export default async function scrapeFollowers({
  repo,
  numStep = 2,
  maxPages = 100,
  sleepTimeMs = 10000
}) {
  let users = [];
  if (!repo) {
    throw new Error('No repository specified.');
  }

  for (let i = 0; i < maxPages; i += numStep) {
    const j = Math.min(i + numStep, maxPages);
    console.log(`Scraping i=${i} j=${j}..`);

    const promises = [];
    for (let u = i; u < j; u++) {
      promises.push(scrapeStarPage(repo, u));
    }

    try {
      const results = await Promise.all(promises);
      users.push.apply(users, results);
    } catch (err) {
      if (err.status === 429) {
        console.error('Too many requests.');
      } else {
        console.error(err);
      }
    }
    await sleep(sleepTimeMs);
  }

  users = [].concat(...users);
  return users;
}
