import moment from 'moment';
import _ from 'lodash';

export default function findFirstCreatedReposByLang(
  repoInfos,
  skipForked = true
) {
  const { languages, repos } = repoInfos;
  const firstLearntByLang = { ...languages };

  // reset all language keys to 0
  Object.keys(firstLearntByLang).map(k => {
    firstLearntByLang[k] = null;
    return null;
  });

  // get earliest repos in O(n) time.
  // Provides option to skip if repo is forked
  // i.e. non-original.
  for (let i = 0; i < repos.length; i++) {
    const r = repos[i];
    const { language, isFork, createdAt } = r;
    const createdAtDate = moment(createdAt);
    if (skipForked) {
      if (
        !isFork &&
        // if earliest date is null
        (!firstLearntByLang[language] ||
          createdAtDate.isBefore(firstLearntByLang[language]))
      ) {
        firstLearntByLang[language] = createdAtDate;
      }
    } else if (createdAtDate.isBefore(firstLearntByLang[language])) {
      firstLearntByLang[language] = createdAtDate;
    }
  }

  // return earliest repos, by language
  return _.pickBy(firstLearntByLang, _.identity);
}
