import { calculateGrid, type GridConfig } from './calculateGrid.js';

export interface ThemeConfig {
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
}

const DEFAULT_THEME: Record<string, ThemeConfig> = {
  dark: { bgColor: '#0d1117', textColor: '#c9d1d9', accentColor: '#58a6ff' },
  light: { bgColor: '#ffffff', textColor: '#24292f', accentColor: '#0969da' },
};

/**
 * Main application renderer. Translates the array of earned badge IDs
 * into an SVG string with accessibility tags and dynamic theming.
 */
export function generateSVG(
  earnedBadgeKeys: string[],
  themeName: string = 'dark',
  customTheme?: ThemeConfig,
  gridConfig?: GridConfig
): string {
  const matrix = calculateGrid(earnedBadgeKeys, gridConfig);
  const theme = { ...(DEFAULT_THEME[themeName] || DEFAULT_THEME.dark), ...customTheme };

  const styleBlock = `
  <style>
    :root {
      --badge-bg: ${theme.bgColor};
      --badge-text: ${theme.textColor};
      --badge-accent: ${theme.accentColor};
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
    // Escape quotes to prevent broken XML from bad SVG payloads
    const safeTitle = b.asset.title.replace(/"/g, '&quot;');
    const safeDesc = b.asset.description.replace(/"/g, '&quot;');
    const ariaLabels = `title-${b.asset.id} desc-${b.asset.id}`;
    const graphic = b.asset.variants[themeName] || b.asset.variants['dark'] || '';

    return `
    <g transform="translate(${b.x}, ${b.y})" role="img" aria-labelledby="${ariaLabels}">
      <title id="title-${b.asset.id}">${safeTitle}</title>
      <desc id="desc-${b.asset.id}">${safeDesc}</desc>
      ${graphic}
    </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${matrix.width} ${matrix.height}" width="${matrix.width}" height="${matrix.height}">
  ${styleBlock}
  ${groupStrings.join('')}
</svg>`;
}
