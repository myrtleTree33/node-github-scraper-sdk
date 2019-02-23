import scrapeFollowers from './followers';
import scrapeRepoGeneral from './general';

export default async function scrapeRepo({
  repo,
  maxPages,
  skipFollowers = true
}) {
  const repoInfo = await scrapeRepoGeneral({ repo });
  if (!skipFollowers) {
    const followers = await scrapeFollowers({ repo, maxPages });
    repoInfo.followers = followers;
  }
  return repoInfo;
}
