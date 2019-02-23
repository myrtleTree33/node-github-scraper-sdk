import scrapeFollowers from './followers';
import scrapeGeneralInfo from './general';

export default async function scrapeRepo({
  repo,
  maxPages,
  skipFollowers = true
}) {
  const repoInfo = await scrapeGeneralInfo({ repo });
  if (!skipFollowers) {
    const followers = await scrapeFollowers({ repo, maxPages });
    repoInfo.followers = followers;
  }
  return repoInfo;
}
