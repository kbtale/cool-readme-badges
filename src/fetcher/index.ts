import { gql, GraphQLClient } from 'graphql-request';
import type { RawGithubResponse } from './types.js';

export * from './types.js';
export * from './parseGithubData.js';

const endpoint = 'https://api.github.com/graphql';

export const USER_DATA_QUERY = gql`
  query GetUserData($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
        }
      }
      pullRequests(first: 1) {
        totalCount
      }
      issues(first: 1) {
        totalCount
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          name
          stargazerCount
          forkCount
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

export const fetchUserData = async (token: string, username: string): Promise<RawGithubResponse> => {
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  try {
    const data = await client.request<RawGithubResponse>(USER_DATA_QUERY, { login: username });
    return data;
  } catch (error) {
    console.error('Error fetching user data from GitHub API:', error);
    throw error;
  }
};
