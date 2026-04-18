import { describe, it, expect } from 'vitest';
import { generateSVG } from '../generateSVG.js';

describe('SVG Template Injector', () => {
  it('generates an empty state graphic when no badges are earned', () => {
    const svg = generateSVG([]);
    expect(svg).toContain('<svg');
    expect(svg).toContain('No badges yet');
    expect(svg).toContain('viewBox="0 0 200 100"');
  });

  it('injects the basic theme graphic by default', () => {
    const svg = generateSVG(['nightOwl']);
    // nightOwl basic graphic: <circle cx="50" cy="50" r="40" fill="gray" />
    expect(svg).toContain('fill="gray"');
  });

  it('injects the requested theme graphic when themeName is provided', () => {
    // Currently only 'basic' is implemented, but we'll test the fallback/selection logic
    const svg = generateSVG(['nightOwl'], 'basic');
    expect(svg).toContain('fill="gray"');
  });

  it('injects accessibility title and desc tags securely from badgeRegistry', () => {
    const svg = generateSVG(['earlyBird']);
    
    expect(svg).toContain('role="img"');
    expect(svg).toContain('aria-labelledby="title-earlyBird desc-earlyBird"');
    expect(svg).toContain('<title id="title-earlyBird">Early Bird</title>');
    expect(svg).toContain('<desc id="desc-earlyBird">20%+ commits between 04:00 and 08:00</desc>');
  });

  it('calculates the root viewBox dynamically from the 4-column grid engine', () => {
    // 4 columns max. 6 items = 2 rows
    // Width: 4*200 + 3*20 = 860
    // Height: 2*100 + 1*20 = 220
    const keys = ['nightOwl', 'earlyBird', 'weekendWarrior', 'marathoner', 'sprinter', 'polyglot'];
    const svg = generateSVG(keys);
    
    expect(svg).toContain('viewBox="0 0 860 220"');
  });

  it('injects CSS variables into the style block', () => {
    const svg = generateSVG(['nightOwl'], 'basic', 'dark');
    expect(svg).toContain('--badge-bg: #0d1117');
    expect(svg).toContain('--badge-text: #c9d1d9');
  });
});
