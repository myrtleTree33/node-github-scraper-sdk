import axios from 'axios';

import { genToken, genTokenHeader } from '../auth/keyRetrieval';

async function scrapeLanguages({ repo }) {
  const token = await genToken();
  const pageUrl = `https://api.github.com/repos/${repo}/languages`;
  const response = await axios.get(pageUrl, genTokenHeader(token));
  const languages = response.data || {};
  return languages;
}

export default async function scrapeRepoGeneral({ repo }) {
  const token = await genToken();
  const pageUrl = `https://api.github.com/repos/${repo}`;
  const response = await axios.get(pageUrl, genTokenHeader(token));

  const {
    id,
    html_url,
    name,
    description,
    language,
    stargazers_count,
    forks_count,
    watchers_count,
    subscribers_count,
    created_at,
    updated_at,
    pushed_at,
    owner
  } = response.data;
  const languages = await scrapeLanguages({ repo });

  return {
    id,
    name,
    url: html_url,
    description,
    language,
    languages,
    numSubscribers: subscribers_count,
    numWatchers: watchers_count,
    numStargazers: stargazers_count,
    numForks: forks_count,
    createdAt: created_at,
    updatedAt: updated_at,
    pushedAt: pushed_at,
    owner: {
      id: owner.id,
      login: owner.login,
      avatarUrl: owner.avatar_url
    }
  };
}
