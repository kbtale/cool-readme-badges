import type { RawGithubResponse, DeveloperProfile, RepositoryStats, LanguageStats, DailyContribution } from './types.js';

export function parseGithubData(username: string, rawData: RawGithubResponse): DeveloperProfile {
  const { user } = rawData;
  const { location, followers, following, contributionsCollection, pullRequests, issues, repositories } = user;

  const commitTimes: string[] = contributionsCollection.commitContributionsByRepository.flatMap(
    (repo) => repo.contributions.nodes.map((node) => node.occurredAt)
  );

  const dailyContributions: DailyContribution[] = contributionsCollection.contributionCalendar.weeks.flatMap(
    (week) => week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      weekday: day.weekday,
    }))
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
      diskUsage: repo.diskUsage,
      primaryLanguage: repo.primaryLanguage?.name || null,
      createdAt: repo.createdAt,
      isArchived: repo.isArchived,
      totalCommits: repo.defaultBranchRef?.target.history?.totalCount || 0,
      collaboratorCount: repo.collaborators.totalCount,
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
    totalMergedPRs: user.mergedPullRequests.totalCount,
    totalIssues: issues.totalCount,
    totalClosedIssues: user.closedIssues.totalCount,
    totalReviews: contributionsCollection.totalPullRequestReviewContributions,
    totalContributions: contributionsCollection.contributionCalendar.totalContributions,
    repositoryCount: repositories.totalCount,
    totalStars,
    totalForks,
    followers: followers.totalCount,
    following: following.totalCount,
    location,
    commitTimes,
    dailyContributions,
    latestIssues: user.latestIssues.nodes.map((node) => ({
      createdAt: node.createdAt,
      closedAt: node.closedAt,
    })),
    contributedRepos: user.repositoriesContributedTo.nodes.map((node) => ({
      isFork: node.isFork,
      owner: node.owner.login,
      collaboratorCount: node.collaborators.totalCount,
    })),
    languages: languageMap,
    repositories: normalizedRepos,
  };
}
