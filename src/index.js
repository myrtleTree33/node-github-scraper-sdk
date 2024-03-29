import scrapeUser from './lib/profile/profile';
import scrapeUserRepos from './lib/profile/userRepos';
import scrapeEmail from './lib/profile/email';
import scrapeFollowers from './lib/profile/followers';
import scrapeUserStarredRepos from './lib/profile/starredRepos';
import scrapeCommitHistory from './lib/profile/commitHistory';

import scrapeRepo from './lib/repo/repoDetails';
import scrapeRepoFollowers from './lib/repo/followers';
import scrapeRepoGeneral from './lib/repo/general';
import scrapeReposByKeyword from './lib/query/repoQuery';
import scrapeUsersByKeyword from './lib/query/userQuery';
import findFirstCreatedReposByLang from './lib/profile/repoUtils';

// load environment variables
const dotenv = require('dotenv');
dotenv.load();

// (async () => {
//   console.log(await scrapeReposByKeyword('cs1010'));
// console.log(await scrapeUsersByKeyword('Seoul'));
// })();

// export default function app() {
// (async () => {
//   const repo = 'nushackers/notes-to-cs-freshmen-from-the-future';
//   const repoInfo = await scrapeRepo({
//     repo,
//     maxPages: 2,
//     skipFollowers: false
//   });
//   console.log(repoInfo);
// })();
// console.log(JSON.stringify(repoInfo));
// const username = 'myrtletree33';

// (async () => {
//   const username = 'myrtletree33';
//   const user = await scrapeUser({ username, maxPages: 1 });
//   console.log(JSON.stringify(user));
// })();

export const profileTools = {
  scrapeUser, // main function doing the below
  scrapeEmail,
  scrapeFollowers,
  scrapeUserRepos,
  scrapeUserStarredRepos,
  scrapeCommitHistory
};

export const repoTools = {
  scrapeRepo,
  scrapeRepoGeneral,
  scrapeRepoFollowers
};

export const queryTools = {
  scrapeReposByKeyword,
  scrapeUsersByKeyword
};
