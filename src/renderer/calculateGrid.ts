import { badgeRegistry, type BadgeMetadata } from './badgeInfo.js';

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
  columns: 4,
};

export interface PositionedBadge {
  x: number;
  y: number;
  id: string;
}

export interface GridCalculationResult {
  width: number;
  height: number;
  badges: PositionedBadge[];
}

/**
 * Calculates a grid matrix with a centered last row for the earned badges.
 */
export function calculateGrid(
  earnedBadgeKeys: string[],
  config: GridConfig = DEFAULT_CONFIG
): GridCalculationResult {
  const { badgeWidth, badgeHeight, gap, columns } = config;

  // Filter out invalid keys
  const validBadgeIds = earnedBadgeKeys.filter(key => badgeRegistry[key] !== undefined);

  if (validBadgeIds.length === 0) {
    return { width: 0, height: 0, badges: [] };
  }

  const totalCount = validBadgeIds.length;
  const numRows = Math.ceil(totalCount / columns);
  const maxColsInAnyRow = Math.min(totalCount, columns);

  // Calculate full container width based on max columns used
  const totalWidth = (maxColsInAnyRow * badgeWidth) + (Math.max(0, maxColsInAnyRow - 1) * gap);
  const totalHeight = (numRows * badgeHeight) + (Math.max(0, numRows - 1) * gap);

  const positionedBadges: PositionedBadge[] = validBadgeIds.map((id, index) => {
    const rowIndex = Math.floor(index / columns);
    const colIndex = index % columns;
    
    // Check if we are in the last row and if it's incomplete
    const isLastRow = rowIndex === numRows - 1;
    const itemsInLastRow = totalCount % columns || columns;
    const isIncompleteLastRow = isLastRow && itemsInLastRow < columns;

    let x = colIndex * (badgeWidth + gap);
    const y = rowIndex * (badgeHeight + gap);

    // If it's an incomplete last row, apply offset to center the items
    if (isIncompleteLastRow) {
      const rowWidth = (itemsInLastRow * badgeWidth) + (Math.max(0, itemsInLastRow - 1) * gap);
      const offset = (totalWidth - rowWidth) / 2;
      x += offset;
    }

    return { x, y, id };
  });

  return {
    width: totalWidth,
    height: totalHeight,
    badges: positionedBadges,
  };
}
