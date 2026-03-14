import { describe, it, expect } from 'vitest';
import { calculateTemporalBadges } from '../temporal.js';
import { emptyProfile, nightOwlProfile, weekendWarriorProfile, marathonerProfile, sprinterProfile } from '../../__tests__/mocks/profiles.js';

describe('Temporal Badges', () => {
  it('should award Night Owl for 30%+ late night commits', () => {
    const result = calculateTemporalBadges(nightOwlProfile);
    expect(result.nightOwl).toBe(true);
    expect(result.earlyBird).toBe(false);
    expect(result.weekendWarrior).toBe(false);
  });

  it('should award Early Bird for early morning consistency', () => {
    const earlyBirdProfile = {
      ...emptyProfile,
      commitTimes: [
        '2024-01-01T06:00:00Z',
        '2024-01-01T06:30:00Z',
        '2024-01-01T07:00:00Z', // 30% early bird (05:00-08:00)
        '2024-01-01T12:00:00Z',
        '2024-01-01T13:00:00Z',
        '2024-01-01T14:00:00Z',
        '2024-01-01T15:00:00Z',
        '2024-01-01T16:00:00Z',
        '2024-01-01T17:00:00Z',
        '2024-01-01T18:00:00Z',
      ],
      location: null,
    };
    const result = calculateTemporalBadges(earlyBirdProfile);
    expect(result.earlyBird).toBe(true);
  });

  it('should award Weekend Warrior for weekend focus', () => {
    const result = calculateTemporalBadges(weekendWarriorProfile);
    expect(result.weekendWarrior).toBe(true);
  });

  it('should award Marathoner for 30 day streak', () => {
    const result = calculateTemporalBadges(marathonerProfile);
    expect(result.marathoner).toBe(true);
  });

  it('should award Sprinter for 50+ contributions in one day', () => {
    const result = calculateTemporalBadges(sprinterProfile);
    expect(result.sprinter).toBe(true);
  });
});
