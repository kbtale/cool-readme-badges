import { findFromCityStateProvince } from 'city-timezones';
import { formatInTimeZone } from 'date-fns-tz';
import type { DeveloperProfile } from '../fetcher/types.js';

export interface TemporalBadgeResult {
  nightOwl: boolean;
  earlyBird: boolean;
  timezone: string;
}

/**
 * Attempts to resolve a timezone string from a GitHub location string.
 * Defaults to 'UTC' if no match is found.
 */
function resolveTimezone(location: string | null): string {
  if (!location) return 'UTC';

  const parts = location.split(/[,/|]/).map(p => p.trim());
  
  for (const part of parts) {
    const matches = findFromCityStateProvince(part);
    if (matches && matches.length > 0) {
      // Pick the first match
      return matches[0]!.timezone;
    }
  }

  return 'UTC';
}

export function calculateTemporalBadges(profile: DeveloperProfile): TemporalBadgeResult {
  const { commitTimes, location } = profile;
  const timezone = resolveTimezone(location);

  if (commitTimes.length === 0) {
    return { nightOwl: false, earlyBird: false, timezone };
  }

  let nightOwlCount = 0;
  let earlyBirdCount = 0;

  for (const timeStr of commitTimes) {
    const date = new Date(timeStr);
    // Format to 'HH' (24-hour) in the user's localized timezone
    const hour = parseInt(formatInTimeZone(date, timezone, 'HH'), 10);

    // Night Owl: Commits between 00:00 and 05:00
    if (hour >= 0 && hour < 5) {
      nightOwlCount++;
    }

    // Early Bird: Commits between 04:00 and 08:00
    if (hour >= 4 && hour < 8) {
      earlyBirdCount++;
    }
  }

  const threshold = 0.20;
  const total = commitTimes.length;

  return {
    nightOwl: nightOwlCount / total >= threshold,
    earlyBird: earlyBirdCount / total >= threshold,
    timezone,
  };
}
