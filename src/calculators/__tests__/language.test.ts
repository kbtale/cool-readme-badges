import { describe, it, expect } from 'vitest';
import { calculateLanguageBadges } from '../language.js';
import { emptyProfile, polyglotProfile } from '../../__tests__/mocks/profiles.js';

describe('Language Badges', () => {
  it('should not award any badges for an empty profile', () => {
    const result = calculateLanguageBadges(emptyProfile);
    expect(result.polyglot).toBe(false);
    expect(result.omniglot).toBe(false);
  });

  it('should award Polyglot for 5 languages', () => {
    const result = calculateLanguageBadges(polyglotProfile);
    expect(result.polyglot).toBe(true);
    expect(result.omniglot).toBe(false);
  });

  it('should award Omniglot for 10 languages', () => {
    const omniglotProfile = {
      ...polyglotProfile,
      languages: {
        ...polyglotProfile.languages,
        Go: { size: 1000, color: '#00ADD8' },
        Rust: { size: 1000, color: '#dea584' },
        Java: { size: 1000, color: '#b07219' },
        PHP: { size: 1000, color: '#4F5D95' },
        Ruby: { size: 1000, color: '#701516' },
      }
    };
    const result = calculateLanguageBadges(omniglotProfile);
    expect(result.omniglot).toBe(true);
  });

  it('should award Wordsmith for documentation focus', () => {
    const wordsmithProfile = {
      ...emptyProfile,
      languages: {
        Markdown: { size: 9000, color: '#083fa1' },
        TypeScript: { size: 1000, color: '#3178c6' },
      }
    };
    const result = calculateLanguageBadges(wordsmithProfile);
    expect(result.wordsmith).toBe(true);
  });

  it('should award Code Diet for a commit with large net deletion', () => {
    const codeDietProfile = {
      ...emptyProfile,
      repositories: [
        {
          name: 'repo1',
          stars: 129,
          forks: 0,
          diskUsage: 40,
          primaryLanguage: 'TypeScript',
          createdAt: '2024-01-01T00:00:00Z',
          isArchived: false,
          totalCommits: 0,
          collaboratorCount: 1,
          languages: [],
        }
      ]
    };
    const result = calculateLanguageBadges(codeDietProfile);
    expect(result.codeDiet).toBe(true);
  });
});
