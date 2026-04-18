import { describe, it, expect } from 'vitest';
import { calculateGrid } from '../calculateGrid.js';

describe('Grid Calculation Engine', () => {
  it('returns empty dimensions for zero earned badges', () => {
    const result = calculateGrid([]);
    expect(result.width).toBe(0);
    expect(result.height).toBe(0);
    expect(result.badges.length).toBe(0);
  });

  it('calculates layout for exactly 4 badges (1 full row)', () => {
    const keys = ['nightOwl', 'earlyBird', 'weekendWarrior', 'marathoner'];
    const result = calculateGrid(keys);
    
    expect(result.badges.length).toBe(4);
    
    // First badge (col 0, row 0)
    expect(result.badges[0]!.x).toBe(0);
    expect(result.badges[0]!.y).toBe(0);

    // Fourth badge (col 3, row 0) => 3 * (200 + 20) = 660
    expect(result.badges[3]!.x).toBe(660);
    expect(result.badges[3]!.y).toBe(0);

    // Width: (4 * 200) + (3 * 20) = 860
    // Height: 100
    expect(result.width).toBe(860);
    expect(result.height).toBe(100);
  });

  it('centers the second row if it is incomplete (e.g., 6 items total)', () => {
    const keys = ['nightOwl', 'earlyBird', 'weekendWarrior', 'marathoner', 'sprinter', 'polyglot'];
    const result = calculateGrid(keys);
    
    expect(result.badges.length).toBe(6);
    
    // Row 2 begins at index 4
    // Items in last row: 2. Row width: 2*200 + 20 = 420
    // Total width: 860. Offset: (860 - 420) / 2 = 220
    
    // Fifth badge (col 0, row 1) => x = 0 + 220, y = 120
    expect(result.badges[4]!.x).toBe(220);
    expect(result.badges[4]!.y).toBe(120);

    // Dimensions: Width 860
    // Height: (2 * 100) + 20 = 220
    expect(result.width).toBe(860);
    expect(result.height).toBe(220);
  });

  it('filters out invalid registry keys', () => {
    const keys = ['nightOwl', 'invalidKey'];
    const result = calculateGrid(keys);
    
    expect(result.badges.length).toBe(1);
    expect(result.badges[0]!.id).toBe('nightOwl');
  });
});
