import scrapeUser from './lib/profile/profile';
import scrapeUserRepos from './lib/profile/userRepos';
import scrapeEmail from './lib/profile/email';
import scrapeFollowers from './lib/profile/followers';
import scrapeUserStarredRepos from './lib/profile/starredRepos';
import scrapeCommitHistory from './lib/profile/commitHistory';

export default function app() {
  // const repo = 'nushackers/notes-to-cs-freshmen-from-the-future';
  // const repoInfo = await scrapeRepo({
  //   repo,
  //   maxPages: 2,
  //   skipFollowers: false
  // });
  // console.log(JSON.stringify(repoInfo));
  // const username = 'myrtletree33';
  // const user = await scrapeUser({ username });
  // console.log(JSON.stringify(user));

  const profile = {
    scrapeUser, // main function doing the below
    scrapeEmail,
    scrapeFollowers,
    scrapeUserRepos,
    scrapeUserStarredRepos,
    scrapeCommitHistory
  };

  const repo = {
    scrapeRepo,
    scrapeFollowers,
    scrapeGeneralInfo
  };

  return { profile, repo };
}

if (require.main === module) {
  app();
}
