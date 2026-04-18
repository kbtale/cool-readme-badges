import { calculateTemporalBadges } from './temporal.js';
import { calculateLanguageBadges } from './language.js';
import { calculateCollaborationBadges } from './collaboration.js';
import { calculateMilestoneBadges } from './milestones.js';
import type { DeveloperProfile } from '../fetcher/types.js';

export * from './temporal.js';
export * from './language.js';
export * from './collaboration.js';
export * from './milestones.js';

/**
 * Executes all badge calculators and returns a flattened array of unlocked badge IDs.
 */
export function calculateAllBadges(profile: DeveloperProfile): string[] {
  const temporal = calculateTemporalBadges(profile);
  const language = calculateLanguageBadges(profile);
  const collaboration = calculateCollaborationBadges(profile);
  const milestones = calculateMilestoneBadges(profile);

  const unlocked: string[] = [];

  // Temporal
  if (temporal.nightOwl) unlocked.push('nightOwl');
  if (temporal.earlyBird) unlocked.push('earlyBird');
  if (temporal.weekendWarrior) unlocked.push('weekendWarrior');
  if (temporal.marathoner) unlocked.push('marathoner');
  if (temporal.sprinter) unlocked.push('sprinter');

  // Language
  if (language.polyglot) unlocked.push('polyglot');
  if (language.omniglot) unlocked.push('omniglot');
  if (language.wordsmith) unlocked.push('wordsmith');
  if (language.codeDiet) unlocked.push('codeDiet');

  // Collaboration
  if (collaboration.mergeMaster) unlocked.push('mergeMaster');
  if (collaboration.hawkEye) unlocked.push('hawkEye');
  if (collaboration.bugHunter) unlocked.push('bugHunter');
  if (collaboration.necromancer) unlocked.push('necromancer');
  if (collaboration.teamPlayer) unlocked.push('teamPlayer');
  if (collaboration.explorer) unlocked.push('explorer');

  // Milestones
  if (milestones.starMagnet) unlocked.push('starMagnet');
  if (milestones.trendSetter) unlocked.push('trendSetter');
  if (milestones.socialButterfly) unlocked.push('socialButterfly');
  if (milestones.soloArtist) unlocked.push('soloArtist');
  if (milestones.archivist) unlocked.push('archivist');

  return unlocked;
}
