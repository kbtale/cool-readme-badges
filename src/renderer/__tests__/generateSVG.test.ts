import { describe, it, expect } from 'vitest';
import { generateSVG } from '../generateSVG.js';

describe('SVG Template Injector', () => {
  it('generates an empty state graphic when no badges are earned', () => {
    const svg = generateSVG([]);
    expect(svg).toContain('<svg');
    expect(svg).toContain('No badges yet');
    expect(svg).toContain('viewBox="0 0 200 100"');
  });

  it('injects the dark variant graphic by default', () => {
    const svg = generateSVG(['nightOwl']);
    // nightOwl dark variant: <circle cx="50" cy="50" r="40" fill="gray" />
    expect(svg).toContain('fill="gray"');
  });

  it('injects the requested variant graphic when themeName is provided', () => {
    const svg = generateSVG(['nightOwl'], 'light');
    // nightOwl light variant: <circle cx="50" cy="50" r="40" fill="lightgray" />
    expect(svg).toContain('fill="lightgray"');
  });

  it('falls back to the dark variant if the requested theme is missing', () => {
    const svg = generateSVG(['nightOwl'], 'neon');
    expect(svg).toContain('fill="gray"');
  });

  it('injects accessibility title and desc tags securely', () => {
    const svg = generateSVG(['earlyBird']);
    
    expect(svg).toContain('role="img"');
    expect(svg).toContain('aria-labelledby="title-earlyBird desc-earlyBird"');
    expect(svg).toContain('<title id="title-earlyBird">Early Bird</title>');
    expect(svg).toContain('<desc id="desc-earlyBird">20%+ commits between 04:00 and 08:00</desc>');
  });

  it('calculates the root viewBox dynamically from the grid engine', () => {
    // 6 columns max (a single full row)
    const keys = ['nightOwl', 'earlyBird', 'weekendWarrior', 'marathoner', 'sprinter', 'polyglot'];
    const svg = generateSVG(keys);
    
    expect(svg).toContain('viewBox="0 0 1300 100"');
  });
});

