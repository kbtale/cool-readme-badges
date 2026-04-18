/**
 * Defines the visual implementation of a single badge.
 */
export interface BadgeVisual {
  /** The SVG content for the badge (excluding the outer <g> tag). */
  graphic: string;
}

/**
 * Interface that all badge themes must implement.
 */
export interface BadgeTheme {
  name: string;
  badges: Record<string, BadgeVisual>;
}
