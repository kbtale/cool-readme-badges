import { calculateGrid, type GridConfig } from './calculateGrid.js';

/**
 * Main application renderer. Translates the array of earned badge IDs
 * into an SVG string with accessibility tags.
 */
export function generateSVG(
  earnedBadgeKeys: string[],
  themeName: string = 'dark',
  gridConfig?: GridConfig
): string {
  const matrix = calculateGrid(earnedBadgeKeys, gridConfig);

  if (matrix.badges.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
  <rect width="200" height="100" rx="4" fill="#0d1117" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#c9d1d9" font-family="sans-serif">No badges yet</text>
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
${groupStrings.join('')}
</svg>`;
}
