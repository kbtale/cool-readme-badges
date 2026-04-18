import { basicTheme } from './basic/index.js';
import { type BadgeTheme } from './types.js';

export const themeRegistry: Record<string, BadgeTheme> = {
  basic: basicTheme,
  // Planned themes will be added here
};

export { type BadgeTheme, type BadgeVisual } from './types.js';
