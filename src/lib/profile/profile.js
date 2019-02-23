import axios from 'axios';
import scrapeEmail from './email';
import scrapeUserStarredRepos from './starredRepos';
import scrapeFollowers from './followers';
import scrapeUserRepos from './repos';
import scrapeCommitHistory from './commitHistory';

import { auth, genCredentials } from '../auth/keyRetrieval';

/**
 * This method scrapes a user's profile
 *
 * @param {*} param0
 */
export default async function scrapeUser({ username }) {
  const _auth = await auth();
  const pageUrl = `https://api.github.com/users/${username}?${genCredentials(
    _auth
  )}`;
  const response = await axios.get(pageUrl);

  const {
    name,
    login,
    avatar_url,
    id,
    html_url,
    company,
    blog,
    location,
    hireable,
    bio,
    public_repos,
    public_gists,
    followers,
    following,
    created_at,
    updated_at
  } = response.data;

  const output = {
    name,
    login,
    id,
    htmlUrl: html_url,
    profilePic: avatar_url,
    company,
    blog,
    location,
    isHireable: hireable,
    bio,
    publicRepos: public_repos,
    publicGists: public_gists,
    numFollowers: followers,
    numFollowing: following,
    createdAt: created_at,
    updatedAt: updated_at
  };

  const emails = await scrapeEmail({ username });
  output.emails = emails;

  const starredRepos = await scrapeUserStarredRepos({ username, maxPages: 1 });
  output.starredRepos = starredRepos;

  const ownedRepos = await scrapeUserRepos({ username, maxPages: 1 });
  output.ownedRepos = ownedRepos;

  const followers2 = await scrapeFollowers({ username, maxPages: 1 });
  output.followers = followers2;

  const commitHistory = await scrapeCommitHistory({ username });
  output.commitHistory = commitHistory;

  return output;
}
