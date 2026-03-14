import { findFromCityStateProvince } from 'city-timezones';
import { formatInTimeZone } from 'date-fns-tz';
import type { DeveloperProfile } from '../fetcher/types.js';

export interface TemporalBadgeResult {
  nightOwl: boolean;
  earlyBird: boolean;
  weekendWarrior: boolean;
  marathoner: boolean;
  sprinter: boolean;
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

  if (commitTimes.length === 0 && profile.dailyContributions.length === 0) {
    return {
      nightOwl: false,
      earlyBird: false,
      weekendWarrior: false,
      marathoner: false,
      sprinter: false,
      timezone
    };
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

  // Weekend Warrior: Ratio of weekend commits > 0.50
  let weekendCount = 0;
  for (const timeStr of commitTimes) {
    const date = new Date(timeStr);
    const day = date.getUTCDay();
    if (day === 0 || day === 6) {
      weekendCount++;
    }
  }
  const isWeekendWarrior = total > 0 && (weekendCount / total) > 0.50;

  // Marathoner: Longest streak >= 30 days
  // Sprinter: Max contribution count in a single day > 50
  let currentStreak = 0;
  let maxStreak = 0;
  let maxDailyCount = 0;

  for (const day of profile.dailyContributions) {
    if (day.count > 0) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }

    if (day.count > maxDailyCount) {
      maxDailyCount = day.count;
    }
  }

  return {
    nightOwl: total > 0 && nightOwlCount / total >= threshold,
    earlyBird: total > 0 && earlyBirdCount / total >= threshold,
    weekendWarrior: isWeekendWarrior,
    marathoner: maxStreak >= 30,
    sprinter: maxDailyCount > 50,
    timezone,
  };
}
