import { describe, it, expect } from 'vitest';
import { calculateCollaborationBadges } from '../collaboration.js';
import { emptyProfile, necromancerProfile } from '../../__tests__/mocks/profiles.js';

describe('Collaboration Badges', () => {
  it('should award Merge Master for 50+ merged PRs', () => {
    const mergeMasterProfile = {
      ...emptyProfile,
      totalMergedPRs: 50,
    };
    const result = calculateCollaborationBadges(mergeMasterProfile);
    expect(result.mergeMaster).toBe(true);
  });

  it('should award Hawk Eye for 50+ reviews', () => {
    const hawkEyeProfile = {
      ...emptyProfile,
      totalReviews: 50,
    };
    const result = calculateCollaborationBadges(hawkEyeProfile);
    expect(result.hawkEye).toBe(true);
  });

  it('should award Bug Hunter for 50+ closed issues', () => {
    const bugHunterProfile = {
      ...emptyProfile,
      totalClosedIssues: 50,
    };
    const result = calculateCollaborationBadges(bugHunterProfile);
    expect(result.bugHunter).toBe(true);
  });

  it('should award Necromancer for long-resolved issues', () => {
    const result = calculateCollaborationBadges(necromancerProfile);
    expect(result.necromancer).toBe(true);
  });

  it('should award Team Player for contributions to large teams', () => {
    const teamPlayerProfile = {
      ...emptyProfile,
      contributedRepos: [
        { isFork: false, owner: 'org', collaboratorCount: 10 }
      ]
    };
    const result = calculateCollaborationBadges(teamPlayerProfile);
    expect(result.teamPlayer).toBe(true);
  });

  it('should award Explorer for 10 unique external repo contributions', () => {
    const explorerProfile = {
      ...emptyProfile,
      contributedRepos: Array.from({ length: 10 }, (_, i) => ({
        isFork: false,
        owner: `otheruser${i}`,
        collaboratorCount: 1
      }))
    };
    const result = calculateCollaborationBadges(explorerProfile);
    expect(result.explorer).toBe(true);
  });
});
