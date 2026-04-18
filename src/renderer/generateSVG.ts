import { calculateGrid, type GridConfig } from './calculateGrid.js';
import { badgeRegistry } from './badgeInfo.js';
import { themeRegistry } from './themes/index.js';

export interface ThemeConfig {
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
}

const DEFAULT_COLORS: Record<string, ThemeConfig> = {
  dark: { bgColor: '#0d1117', textColor: '#c9d1d9', accentColor: '#58a6ff' },
  light: { bgColor: '#ffffff', textColor: '#24292f', accentColor: '#0969da' },
};

/**
 * Main application renderer. Translates the array of earned badge IDs
 * into an SVG string using a folder-based theme system.
 */
export function generateSVG(
  earnedBadgeKeys: string[],
  themeName: string = 'basic',
  colorMode: string = 'dark',
  customTheme?: ThemeConfig,
  gridConfig?: GridConfig
): string {
  const matrix = calculateGrid(earnedBadgeKeys, gridConfig);
  const theme = themeRegistry[themeName] || themeRegistry['basic']!;
  const colors = { ...(DEFAULT_COLORS[colorMode] || DEFAULT_COLORS.dark), ...customTheme };

  const styleBlock = `
  <style>
    :root {
      --badge-bg: ${colors.bgColor};
      --badge-text: ${colors.textColor};
      --badge-accent: ${colors.accentColor};
      --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }
    .badge-label { fill: var(--badge-text); font-family: var(--font-family); font-size: 14px; font-weight: 600; }
  </style>`;

  if (matrix.badges.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
  ${styleBlock}
  <rect width="200" height="100" rx="4" fill="var(--badge-bg)" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="badge-label">No badges yet</text>
</svg>`;
  }

  const groupStrings = matrix.badges.map((b) => {
    const meta = badgeRegistry[b.id];
    const visual = theme.badges[b.id];

    if (!meta || !visual) return '';

    // Escape quotes for accessibility tags
    const safeTitle = meta.title.replace(/"/g, '&quot;');
    const safeDesc = meta.description.replace(/"/g, '&quot;');
    const ariaLabels = `title-${meta.id} desc-${meta.id}`;

    return `
    <g transform="translate(${b.x}, ${b.y})" role="img" aria-labelledby="${ariaLabels}">
      <title id="title-${meta.id}">${safeTitle}</title>
      <desc id="desc-${meta.id}">${safeDesc}</desc>
      ${visual.graphic}
    </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${matrix.width} ${matrix.height}" width="${matrix.width}" height="${matrix.height}">
  ${styleBlock}
  ${groupStrings.join('')}
</svg>`;
}
