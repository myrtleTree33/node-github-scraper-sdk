import axios from 'axios';

import { genToken, genTokenHeader } from '../auth/keyRetrieval';

/**
 * This method scrapes a user's email
 *
 * @param {*} param0
 */
export default async function scrapeEmail({ username }) {
  const emails = [];
  const token = await genToken();

  const pageUrl = 'https://api.github.com/users/' + `${username}/events/public`;

  const response = await axios.get(pageUrl, genTokenHeader(token));
  const events = response.data;
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (
      !event ||
      !event.payload ||
      !event.payload.commits ||
      event.payload.commits.length === 0
    ) {
      continue;
    }

    const commits = event.payload.commits;
    for (let y = 0; y < commits.length; y++) {
      const author = commits[y].author;
      if (!author) {
        continue;
      }
      const email = author.email;
      if (!email) {
        continue;
      }
      emails.push(email);
    }
  }
  return new Set(emails);
}
