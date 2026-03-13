import type { DeveloperProfile } from '../fetcher/types.js';

export interface CollaborationBadgeResult {
  mergeMaster: boolean;
  hawkEye: boolean;
  bugHunter: boolean;
  necromancer: boolean;
  teamPlayer: boolean;
  explorer: boolean;
}

export function calculateCollaborationBadges(profile: DeveloperProfile): CollaborationBadgeResult {
  const {
    totalMergedPRs,
    totalReviews,
    totalClosedIssues,
    latestIssues,
    contributedRepos,
  } = profile;

  // Merge Master: 50+ total merged PRs
  const isMergeMaster = totalMergedPRs >= 50;

  // Hawk Eye: 50+ total PR reviews
  const isHawkEye = totalReviews >= 50;

  // Bug Hunter: 50+ total closed issues
  const isBugHunter = totalClosedIssues >= 50;

  // Necromancer: Among the latest 10 issues, was any closed 365+ days after creation?
  let isNecromancer = false;
  
  for (const issue of latestIssues) {
    if (issue.closedAt) {
      const createdMs = new Date(issue.createdAt).getTime();
      const closedMs = new Date(issue.closedAt).getTime();
      const diffDays = (closedMs - createdMs) / (1000 * 60 * 60 * 24);
      
      if (diffDays >= 365) {
        isNecromancer = true;
        break;
      }
    }
  }

  // Team Player & Explorer
  let isTeamPlayer = false;
  const uniqueExternalRepos = new Set<string>();

  for (const repo of contributedRepos) {
    if (repo.collaboratorCount >= 10) {
      isTeamPlayer = true;
    }
    
    if (repo.isFork || repo.owner !== profile.username) {
      uniqueExternalRepos.add(`${repo.owner}`);
    }
  }

  const isExplorer = uniqueExternalRepos.size >= 10;

  return {
    mergeMaster: isMergeMaster,
    hawkEye: isHawkEye,
    bugHunter: isBugHunter,
    necromancer: isNecromancer,
    teamPlayer: isTeamPlayer,
    explorer: isExplorer,
  };
}
