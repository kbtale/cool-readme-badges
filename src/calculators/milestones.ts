import type { DeveloperProfile } from '../fetcher/types.js';

export interface MilestoneBadgeResult {
  starMagnet: boolean;
  trendSetter: boolean;
  socialButterfly: boolean;
  soloArtist: boolean;
  archivist: boolean;
}

export function calculateMilestoneBadges(profile: DeveloperProfile): MilestoneBadgeResult {
  const { totalStars, followers, following, repositories } = profile;

  // Star Magnet: total stars > 100 across owned repos
  const isStarMagnet = totalStars > 100;

  // Social Butterfly: >= 50 followers & >= 50 following
  const isSocialButterfly = followers >= 50 && following >= 50;

  let isTrendSetter = false;
  let soloCommits = 0;
  let archivedCount = 0;

  const nowMs = Date.now();
  const msInMonth = 1000 * 60 * 60 * 24 * 30;

  for (const repo of repositories) {
    // Trend Setter: Velocity >= 128 stars/month AND >= 128 minimum stars
    if (repo.stars >= 128) {
      const createdMs = new Date(repo.createdAt).getTime();
      let ageInMonths = (nowMs - createdMs) / msInMonth;
      
      // Prevent division by zero or inflated stats for repos < 1 month old
      if (ageInMonths < 1) {
        ageInMonths = 1;
      }

      const velocity = repo.stars / ageInMonths;
      if (velocity >= 128) {
        isTrendSetter = true;
      }
    }

    // Solo Artist: >= 500 total commits in repos where collaborator count is 1 (or 0)
    if (repo.collaboratorCount <= 1) {
      soloCommits += repo.totalCommits;
    }

    // Archivist: >= 5 archived repos
    if (repo.isArchived) {
      archivedCount++;
    }
  }

  return {
    starMagnet: isStarMagnet,
    trendSetter: isTrendSetter,
    socialButterfly: isSocialButterfly,
    soloArtist: soloCommits >= 500,
    archivist: archivedCount >= 5,
  };
}
