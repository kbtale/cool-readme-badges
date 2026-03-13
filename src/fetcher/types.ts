export interface GithubLanguage {
  name: string;
  color: string;
}

export interface LanguageStats {
  name: string;
  color: string;
  size: number;
}

export interface RepositoryStats {
  name: string;
  stars: number;
  forks: number;
  languages: LanguageStats[];
}

export interface DeveloperProfile {
  username: string;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReviews: number;
  totalContributions: number;
  repositoryCount: number;
  totalStars: number;
  totalForks: number;
  languages: Record<string, { size: number; color: string }>;
  repositories: RepositoryStats[];
}

export interface RawGithubResponse {
  user: {
    contributionsCollection: {
      totalCommitContributions: number;
      totalIssueContributions: number;
      totalPullRequestContributions: number;
      totalPullRequestReviewContributions: number;
      contributionCalendar: {
        totalContributions: number;
      };
    };
    pullRequests: {
      totalCount: number;
    };
    issues: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
      nodes: Array<{
        name: string;
        stargazerCount: number;
        forkCount: number;
        languages: {
          edges: Array<{
            size: number;
            node: GithubLanguage;
          }>;
        };
      }>;
    };
  };
}
