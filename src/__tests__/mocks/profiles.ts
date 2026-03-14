import type { DeveloperProfile } from '../../fetcher/types.js';

export const emptyProfile: DeveloperProfile = {
  username: 'testuser',
  totalCommits: 0,
  totalPRs: 0,
  totalMergedPRs: 0,
  totalIssues: 0,
  totalClosedIssues: 0,
  totalReviews: 0,
  totalContributions: 0,
  repositoryCount: 0,
  totalStars: 0,
  totalForks: 0,
  followers: 0,
  following: 0,
  location: null,
  commitTimes: [],
  dailyContributions: [],
  latestIssues: [],
  contributedRepos: [],
  languages: {},
  repositories: [],
};

export const nightOwlProfile: DeveloperProfile = {
  ...emptyProfile,
  totalCommits: 10,
  commitTimes: [
    '2024-01-01T01:00:00Z',
    '2024-01-01T02:00:00Z',
    '2024-01-01T03:00:00Z',
    '2024-01-01T04:00:00Z', // 40% at night (00:00-05:00)
    '2024-01-01T12:00:00Z',
    '2024-01-01T13:00:00Z',
    '2024-01-01T14:00:00Z',
    '2024-01-01T15:00:00Z',
    '2024-01-01T16:00:00Z',
    '2024-01-01T17:00:00Z',
  ],
  location: null, // UTC
};

export const polyglotProfile: DeveloperProfile = {
  ...emptyProfile,
  languages: {
    TypeScript: { size: 1000, color: '#3178c6' },
    JavaScript: { size: 1000, color: '#f1e05a' },
    HTML: { size: 1000, color: '#e34c26' },
    CSS: { size: 1000, color: '#563d7c' },
    Python: { size: 1000, color: '#3572A5' },
  },
};

export const starMagnetProfile: DeveloperProfile = {
  ...emptyProfile,
  totalStars: 101,
};

export const necromancerProfile: DeveloperProfile = {
  ...emptyProfile,
  latestIssues: [
    {
      createdAt: '2023-01-01T00:00:00Z',
      closedAt: '2024-01-02T00:00:00Z', // Over 365 days
    },
  ],
};

export const trendSetterProfile: DeveloperProfile = {
  ...emptyProfile,
  repositories: [
    {
      name: 'viral-repo',
      stars: 300,
      forks: 0,
      diskUsage: 100,
      primaryLanguage: 'TypeScript',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago, i always forget how to do this lol
      isArchived: false,
      totalCommits: 100,
      collaboratorCount: 1,
      languages: [],
    },
  ],
};

export const weekendWarriorProfile: DeveloperProfile = {
  ...emptyProfile,
  totalCommits: 4,
  commitTimes: [
    '2024-01-06T12:00:00Z', // Saturday
    '2024-01-06T13:00:00Z', // Saturday
    '2024-01-07T12:00:00Z', // Sunday
    '2024-01-01T12:00:00Z', // Monday
  ], // 75% on weekends
};

export const marathonerProfile: DeveloperProfile = {
  ...emptyProfile,
  dailyContributions: Array.from({ length: 30 }, (_, i) => ({
    date: `2024-01-${i + 1}`,
    count: 1,
    weekday: 1,
  })),
};

export const sprinterProfile: DeveloperProfile = {
  ...emptyProfile,
  dailyContributions: [
    { date: '2024-01-01', count: 51, weekday: 1 },
  ],
};
