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
  diskUsage: number;
  primaryLanguage: string | null;
  languages: LanguageStats[];
}

export interface DeveloperProfile {
  username: string;
  totalCommits: number;
  totalPRs: number;
  totalMergedPRs: number;
  totalIssues: number;
  totalClosedIssues: number;
  totalReviews: number;
  totalContributions: number;
  repositoryCount: number;
  totalStars: number;
  totalForks: number;
  location: string | null;
  commitTimes: string[];
  latestIssues: { createdAt: string; closedAt: string | null }[];
  contributedRepos: { isFork: boolean; owner: string; collaboratorCount: number }[];
  languages: Record<string, { size: number; color: string }>;
  repositories: RepositoryStats[];
}

export interface RawGithubResponse {
  user: {
    location: string | null;
    contributionsCollection: {
      totalCommitContributions: number;
      totalIssueContributions: number;
      totalPullRequestContributions: number;
      totalPullRequestReviewContributions: number;
      contributionCalendar: {
        totalContributions: number;
      };
      commitContributionsByRepository: Array<{
        contributions: {
          nodes: Array<{
            occurredAt: string;
          }>;
        };
      }>;
    };
    pullRequests: {
      totalCount: number;
    };
    mergedPullRequests: {
      totalCount: number;
    };
    issues: {
      totalCount: number;
    };
    closedIssues: {
      totalCount: number;
    };
    latestIssues: {
      nodes: Array<{
        createdAt: string;
        closedAt: string | null;
      }>;
    };
    repositoriesContributedTo: {
      nodes: Array<{
        isFork: boolean;
        owner: {
          login: string;
        };
        collaborators: {
          totalCount: number;
        };
      }>;
    };
    repositories: {
      totalCount: number;
      nodes: Array<{
        name: string;
        stargazerCount: number;
        forkCount: number;
        diskUsage: number;
        primaryLanguage: {
          name: string;
        } | null;
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
