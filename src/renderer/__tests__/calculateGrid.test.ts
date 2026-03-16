import { describe, it, expect } from 'vitest';
import { calculateGrid } from '../calculateGrid.js';

describe('Grid Calculation Engine', () => {
  it('returns empty dimensions for zero earned badges', () => {
    const result = calculateGrid([]);
    expect(result.width).toBe(0);
    expect(result.height).toBe(0);
    expect(result.badges.length).toBe(0);
  });

  it('calculates layout for exactly 6 badges (1 full row)', () => {
    const keys = ['nightOwl', 'earlyBird', 'weekendWarrior', 'marathoner', 'sprinter', 'polyglot'];
    const result = calculateGrid(keys);
    
    expect(result.badges.length).toBe(6);
    
    // First badge (col 0, row 0)
    expect(result.badges[0]!.x).toBe(0);
    expect(result.badges[0]!.y).toBe(0);

    // Sixth badge (col 5, row 0) => 5 * (200 + 20) = 1100
    expect(result.badges[5]!.x).toBe(1100);
    expect(result.badges[5]!.y).toBe(0);

    // Width: (6 * 200) + (5 * 20) = 1200 + 100 = 1300
    // Height: 100
    expect(result.width).toBe(1300);
    expect(result.height).toBe(100);
  });

  it('drops the 7th badge to the second row (left aligned)', () => {
    const keys = ['nightOwl', 'earlyBird', 'weekendWarrior', 'marathoner', 'sprinter', 'polyglot', 'omniglot'];
    const result = calculateGrid(keys);
    
    expect(result.badges.length).toBe(7);
    
    // Seventh badge (col 0, row 1) => x=0, y=1 * (100 + 20) = 120
    expect(result.badges[6]!.x).toBe(0);
    expect(result.badges[6]!.y).toBe(120);

    // Dimensions: Width remains 1300
    // Height: (2 * 100) + (1 * 20) = 220
    expect(result.width).toBe(1300);
    expect(result.height).toBe(220);
  });

  it('filters out invalid registry keys', () => {
    const keys = ['nightOwl', 'invalidKey'];
    const result = calculateGrid(keys);
    
    expect(result.badges.length).toBe(1);
    expect(result.badges[0]!.asset.id).toBe('nightOwl');
  });
});
