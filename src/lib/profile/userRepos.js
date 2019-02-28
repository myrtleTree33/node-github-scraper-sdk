import axios from 'axios';
import sleep from 'await-sleep';

import { genToken, genTokenHeader } from '../auth/keyRetrieval';

/**
 * This method scrapes a user's repositories.
 *
 * @param {*} param0
 */
export default async function scrapeUserRepos({ username, maxPages }) {
  const promises = [];
  for (let i = 1; i <= maxPages; i++) {
    console.log(`Retrieving repos; page=${i}`);
    promises.push(retrieveRepos(username, i));
    await sleep(20);
  }
  const results = await Promise.all(promises);
  const repos = [].concat(...results);
  const languages = getLanguageBreakdown(repos);
  return {
    repos,
    languages
  };
}

async function retrieveRepos(username, page = 1) {
  const output = [];
  const token = await genToken();

  const pageUrl =
    'https://api.github.com/users/' + `${username}/repos?page=${page}`;

  const response = await axios.get(pageUrl, genTokenHeader(token));
  const repos = response.data;

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    const {
      id,
      name,
      full_name,
      html_url,
      owner,
      fork,
      stargazers_count,
      watchers_count,
      forks_count,
      language,
      created_at,
      updated_at,
      pushed_at,
      description
    } = repo;

    output.push({
      id,
      name,
      full_name,
      description,
      htmlUrl: html_url,
      owner: {
        id: owner.id,
        login: owner.login
      },
      isFork: fork,
      numStargazers: stargazers_count,
      numWatchers: watchers_count,
      numForks: forks_count,
      language,
      createdAt: created_at,
      updatedAt: updated_at,
      pushedAt: pushed_at
    });
  }

  return output;
}

function getLanguageBreakdown(repos) {
  const output = {};
  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    const { language } = repo;
    output[language] = (output[language] || 0) + 1;
  }
  return output;
}
