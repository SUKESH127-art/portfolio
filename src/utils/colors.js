import colors from '../data/entire_site/colors.json';

/**
 * Color utility functions for accessing the centralized color system
 * All colors are defined in src/data/colors.json
 */

/**
 * Get a color value by path
 * @param {string} path - Dot-separated path to color (e.g., 'brand.primary.base')
 * @returns {string} Color value
 * @example
 * getColor('brand.primary.base') // returns '#0e7490'
 * getColor('text.home.primary.base') // returns '#0c4a6e'
 */
export const getColor = (path) => {
  const keys = path.split('.');
  let value = colors;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Color path not found: ${path}`);
      return null;
    }
  }
  
  return typeof value === 'string' ? value : null;
};

/**
 * Get brand colors
 */
export const getBrandColors = () => ({
  primary: colors.brand.primary.base,
  primaryHover: colors.brand.primary.hover,
  secondary: colors.brand.secondary.base,
  accent: colors.brand.accent.base,
});

/**
 * Get background colors
 */
export const getBackgroundColors = () => ({
  page: colors.background.page.base,
  white: colors.background.white.base,
  dark: colors.background.dark.base,
  overlay: colors.background.gradient.overlay.base,
});

/**
 * Get text colors
 */
export const getTextColors = () => ({
  primary: colors.text.primary.base,
  secondary: colors.text.secondary.base,
  muted: colors.text.muted.base,
  light: colors.text.light.base,
  home: {
    primary: colors.text.home.primary.base,
    accent: colors.text.home.accent.base,
  },
  experiences: {
    job: colors.text.experiences.job.base,
    title: colors.text.experiences.title.base,
    date: colors.text.experiences.date.base,
  },
  projects: {
    title: colors.text.projects.title.base,
    description: colors.text.projects.description.base,
    hover: colors.text.projects.hover.base,
  },
});

/**
 * Get glass effect colors
 */
export const getGlassColors = () => ({
  background: {
    light: colors.glass.background.light.base,
    medium: colors.glass.background.medium.base,
    veryLight: colors.glass.background.veryLight.base,
    dark: colors.glass.background.dark.base,
    mobile: colors.glass.background.mobile.base,
  },
  border: {
    light: colors.glass.border.light,
    medium: colors.glass.border.medium,
  },
});

/**
 * Get overlay colors
 */
export const getOverlayColors = () => ({
  dark: colors.overlays.dark.base,
  gradient: {
    black: colors.overlays.gradient.black.base,
    purple: colors.overlays.gradient.purple.base,
  },
});

/**
 * Get border colors
 */
export const getBorderColors = () => ({
  default: colors.borders.default.base,
  input: colors.borders.input.base,
  glass: {
    light: colors.borders.glass.light.base,
    medium: colors.borders.glass.medium.base,
  },
});

/**
 * Get theme colors (custom Tailwind colors)
 */
export const getThemeColors = () => colors.theme;

/**
 * Get shadow values
 */
export const getShadows = () => colors.shadows;

/**
 * Export all colors for direct access
 */
export default colors;

