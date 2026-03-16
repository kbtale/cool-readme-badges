import { badgeAssets, type BadgeAsset } from './assets.js';

export interface GridConfig {
  badgeWidth: number;
  badgeHeight: number;
  gap: number;
  columns: number;
}

const DEFAULT_CONFIG: GridConfig = {
  badgeWidth: 200,
  badgeHeight: 100,
  gap: 20,
  columns: 6,
};

export interface PositionedBadge {
  x: number;
  y: number;
  asset: BadgeAsset;
}

export interface GridCalculationResult {
  width: number;
  height: number;
  badges: PositionedBadge[];
}

/**
 * Calculates a left-aligned grid matrix for the earned badges.
 */
export function calculateGrid(
  earnedBadgeKeys: string[],
  config: GridConfig = DEFAULT_CONFIG
): GridCalculationResult {
  const { badgeWidth, badgeHeight, gap, columns } = config;

  // Filter out invalid keys
  const validBadges = earnedBadgeKeys
    .map(key => badgeAssets[key])
    .filter((asset): asset is BadgeAsset => asset !== undefined);

  if (validBadges.length === 0) {
    return { width: 0, height: 0, badges: [] };
  }

  // Loop through and calculate absolute X and Y
  const positionedBadges: PositionedBadge[] = validBadges.map((asset, index) => {
    const colIndex = index % columns;
    const rowIndex = Math.floor(index / columns);

    const x = colIndex * (badgeWidth + gap);
    const y = rowIndex * (badgeHeight + gap);

    return { x, y, asset };
  });

  // Calculate dynamic width (max 6 cols) and height
  const numRows = Math.ceil(validBadges.length / columns);
  const maxColsInAnyRow = Math.min(validBadges.length, columns);

  const totalWidth = (maxColsInAnyRow * badgeWidth) + (Math.max(0, maxColsInAnyRow - 1) * gap);
  const totalHeight = (numRows * badgeHeight) + (Math.max(0, numRows - 1) * gap);

  return {
    width: totalWidth,
    height: totalHeight,
    badges: positionedBadges,
  };
}
