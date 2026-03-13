import type { RawGithubResponse, DeveloperProfile, RepositoryStats, LanguageStats } from './types.js';

export function parseGithubData(username: string, rawData: RawGithubResponse): DeveloperProfile {
  const { user } = rawData;
  const { location, contributionsCollection, pullRequests, issues, repositories } = user;

  const commitTimes: string[] = contributionsCollection.commitContributionsByRepository.flatMap(
    (repo) => repo.contributions.nodes.map((node) => node.occurredAt)
  );

  const normalizedRepos: RepositoryStats[] = repositories.nodes.map((repo) => {
    const langs: LanguageStats[] = repo.languages.edges.map((edge) => ({
      name: edge.node.name,
      color: edge.node.color,
      size: edge.size,
    }));

    return {
      name: repo.name,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      languages: langs,
    };
  });

  // Aggregate languages across all repositories
  const languageMap: Record<string, { size: number; color: string }> = {};
  let totalStars = 0;
  let totalForks = 0;

  for (const repo of normalizedRepos) {
    totalStars += repo.stars;
    totalForks += repo.forks;

    for (const lang of repo.languages) {
      if (!languageMap[lang.name]) {
        languageMap[lang.name] = { size: 0, color: lang.color };
      }
      const current = languageMap[lang.name];
      if (current) {
        current.size += lang.size;
      }
    }
  }

  return {
    username,
    totalCommits: contributionsCollection.totalCommitContributions,
    totalPRs: pullRequests.totalCount,
    totalIssues: issues.totalCount,
    totalReviews: contributionsCollection.totalPullRequestReviewContributions,
    totalContributions: contributionsCollection.contributionCalendar.totalContributions,
    repositoryCount: repositories.totalCount,
    totalStars,
    totalForks,
    location,
    commitTimes,
    languages: languageMap,
    repositories: normalizedRepos,
  };
}
