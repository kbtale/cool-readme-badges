import { describe, it, expect } from 'vitest';
import { calculateMilestoneBadges } from '../milestones.js';
import { emptyProfile, starMagnetProfile, trendSetterProfile } from '../../__tests__/mocks/profiles.js';

describe('Milestone Badges', () => {
  it('should award Star Magnet for > 100 stars', () => {
    const result = calculateMilestoneBadges(starMagnetProfile);
    expect(result.starMagnet).toBe(true);
  });

  it('should award Social Butterfly for 50+ followers and following', () => {
    const butterflyProfile = {
      ...emptyProfile,
      followers: 50,
      following: 50,
    };
    const result = calculateMilestoneBadges(butterflyProfile);
    expect(result.socialButterfly).toBe(true);
  });

  it('should award Trend Setter for high velocity repos', () => {
    const result = calculateMilestoneBadges(trendSetterProfile);
    expect(result.trendSetter).toBe(true);
  });

  it('should award Solo Artist for 500+ commits in solo repos', () => {
    const soloArtistProfile = {
      ...emptyProfile,
      repositories: [
        {
          name: 'solo-repo',
          stars: 10,
          forks: 0,
          diskUsage: 100,
          primaryLanguage: 'TypeScript',
          createdAt: '2020-01-01T00:00:00Z',
          isArchived: false,
          totalCommits: 600,
          collaboratorCount: 1,
          languages: [],
        }
      ]
    };
    const result = calculateMilestoneBadges(soloArtistProfile);
    expect(result.soloArtist).toBe(true);
  });

  it('should award Archivist for 5+ archived repos', () => {
    const archivistProfile = {
      ...emptyProfile,
      repositories: Array.from({ length: 5 }, (_, i) => ({
        name: `archived-repo-${i}`,
        stars: 0,
        forks: 0,
        diskUsage: 100,
        primaryLanguage: 'TypeScript',
        createdAt: '2020-01-01T00:00:00Z',
        isArchived: true,
        totalCommits: 10,
        collaboratorCount: 1,
        languages: [],
      }))
    };
    const result = calculateMilestoneBadges(archivistProfile);
    expect(result.archivist).toBe(true);
  });
});
