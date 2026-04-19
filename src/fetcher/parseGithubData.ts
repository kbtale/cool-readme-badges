import type { RawGithubResponse, DeveloperProfile, RepositoryStats, LanguageStats, DailyContribution } from './types.js';

export function parseGithubData(username: string, rawData: RawGithubResponse): DeveloperProfile {
  const { user } = rawData;
  const { location, followers, following, contributionsCollection, pullRequests, issues, repositories } = user;

  const commitTimes: string[] = (contributionsCollection.commitContributionsByRepository || []).flatMap(
    (repo) => (repo.contributions.nodes || []).map((node) => node.occurredAt)
  );

  const dailyContributions: DailyContribution[] = (contributionsCollection.contributionCalendar.weeks || []).flatMap(
    (week) => (week.contributionDays || []).map((day) => ({
      date: day.date,
      count: day.contributionCount,
      weekday: day.weekday,
    }))
  );

  const normalizedRepos: RepositoryStats[] = (repositories.nodes || []).map((repo) => {
    const langs: LanguageStats[] = (repo.languages?.edges || []).map((edge) => ({
      name: edge.node.name,
      color: edge.node.color,
      size: edge.size,
    }));

    const totalCommits = repo.defaultBranchRef?.target?.history?.totalCount || 0;

    return {
      name: repo.name,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      diskUsage: repo.diskUsage,
      primaryLanguage: repo.primaryLanguage?.name || null,
      createdAt: repo.createdAt,
      isArchived: repo.isArchived,
      totalCommits,
      collaboratorCount: repo.collaborators?.totalCount || 0,
      languages: langs,
    };
  });

  // Aggregate languages across all repositories
  const languageMap: Record<string, { size: number; color: string }> = {};
  let totalStars = 0;
  let totalForks = 0;

  for (const repo of normalizedRepos) {
    totalStars += repo.stars || 0;
    totalForks += repo.forks || 0;

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
    totalCommits: contributionsCollection.totalCommitContributions || 0,
    totalPRs: pullRequests.totalCount || 0,
    totalMergedPRs: user.mergedPullRequests?.totalCount || 0,
    totalIssues: issues.totalCount || 0,
    totalIssueContributions: contributionsCollection.totalIssueContributions || 0,
    totalClosedIssues: user.closedIssues?.totalCount || 0,
    totalReviews: contributionsCollection.totalPullRequestReviewContributions || 0,
    totalContributions: contributionsCollection.contributionCalendar.totalContributions || 0,
    repositoryCount: repositories.totalCount || 0,
    totalStars,
    totalForks,
    followers: followers.totalCount || 0,
    following: following.totalCount || 0,
    location: location || null,
    commitTimes,
    dailyContributions,
    latestIssues: (user.latestIssues?.nodes || []).map((node) => ({
      createdAt: node.createdAt,
      closedAt: node.closedAt,
    })),
    contributedRepos: (user.repositoriesContributedTo?.nodes || []).map((node) => ({
      isFork: node.isFork,
      owner: node.owner?.login || '',
      collaboratorCount: node.collaborators?.totalCount || 0,
    })),
    languages: languageMap,
    repositories: normalizedRepos,
  };
}
