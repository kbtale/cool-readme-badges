import type { DeveloperProfile } from '../fetcher/types.js';

export interface LanguageBadgeResult {
  polyglot: boolean;
  omniglot: boolean;
  wordsmith: boolean;
  codeDiet: boolean;
}

export function calculateLanguageBadges(profile: DeveloperProfile): LanguageBadgeResult {
  const { languages, repositories } = profile;

  // Polyglot & Omniglot
  let totalByteSize = 0;
  for (const lang of Object.values(languages)) {
    totalByteSize += lang.size;
  }

  const onePercentThreshold = totalByteSize * 0.01;
  let significantLanguagesCount = 0;
  
  let markdownSize = 0;

  for (const [name, lang] of Object.entries(languages)) {
    if (lang.size >= onePercentThreshold) {
      significantLanguagesCount++;
    }
    if (name.toLowerCase() === 'markdown') {
      markdownSize += lang.size;
    }
  }

  // Wordsmith
  // If markdown takes up more than 25% of their written code
  const isWordsmith = totalByteSize > 0 && (markdownSize / totalByteSize) > 0.25;

  // Code Diet
  // At least one repository must have > 128 stars, be < 50 KB disk size, and NOT have Markdown as its primary language.
  let isCodeDiet = false;

  for (const repo of repositories) {
    if (
      repo.stars > 128 &&
      repo.diskUsage < 50 &&
      repo.primaryLanguage?.toLowerCase() !== 'markdown'
    ) {
      isCodeDiet = true;
      break;
    }
  }

  return {
    polyglot: significantLanguagesCount >= 5,
    omniglot: significantLanguagesCount >= 10,
    wordsmith: isWordsmith,
    codeDiet: isCodeDiet,
  };
}
