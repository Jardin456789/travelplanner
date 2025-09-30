/**
 * Design System - Color Tokens
 * Using OKLCH color space for better color consistency and accessibility
 */

// Base color palette
export const colors = {
  // Neutral colors
  neutral: {
    50: 'oklch(0.99 0 0)',   // Very light gray
    100: 'oklch(0.97 0.005 240)', // Light gray
    200: 'oklch(0.92 0 0)',  // Medium light gray
    300: 'oklch(0.8 0 0)',   // Light medium gray
    400: 'oklch(0.7 0 0)',   // Medium gray
    500: 'oklch(0.6 0 0)',   // Base gray
    600: 'oklch(0.45 0 0)',  // Dark medium gray
    700: 'oklch(0.35 0 0)',  // Dark gray
    800: 'oklch(0.25 0 0)',  // Very dark gray
    900: 'oklch(0.15 0 0)',  // Almost black
    950: 'oklch(0.08 0 0)',  // Very dark
  },

  // Primary colors (travel theme - blues and greens)
  primary: {
    50: 'oklch(0.97 0.02 240)',   // Very light blue
    100: 'oklch(0.92 0.04 240)',  // Light blue
    200: 'oklch(0.85 0.08 240)',  // Lighter blue
    300: 'oklch(0.75 0.12 240)',  // Light medium blue
    400: 'oklch(0.65 0.16 240)',  // Medium blue
    500: 'oklch(0.55 0.2 240)',   // Base blue (main primary)
    600: 'oklch(0.45 0.24 240)',  // Dark medium blue
    700: 'oklch(0.35 0.28 240)',  // Dark blue
    800: 'oklch(0.25 0.32 240)',  // Very dark blue
    900: 'oklch(0.15 0.36 240)',  // Darkest blue
  },

  // Secondary colors (accent - greens)
  secondary: {
    50: 'oklch(0.97 0.02 140)',   // Very light green
    100: 'oklch(0.92 0.04 140)',  // Light green
    200: 'oklch(0.85 0.08 140)',  // Lighter green
    300: 'oklch(0.75 0.12 140)',  // Light medium green
    400: 'oklch(0.65 0.16 140)',  // Medium green
    500: 'oklch(0.55 0.2 140)',   // Base green (main secondary)
    600: 'oklch(0.45 0.24 140)',  // Dark medium green
    700: 'oklch(0.35 0.28 140)',  // Dark green
    800: 'oklch(0.25 0.32 140)',  // Very dark green
    900: 'oklch(0.15 0.36 140)',  // Darkest green
  },

  // Accent colors (travel-specific)
  accent: {
    // Warm colors for highlights
    50: 'oklch(0.97 0.03 60)',    // Very light warm
    100: 'oklch(0.92 0.06 60)',   // Light warm
    200: 'oklch(0.85 0.09 60)',   // Lighter warm
    300: 'oklch(0.75 0.12 60)',   // Light medium warm
    400: 'oklch(0.65 0.15 60)',   // Medium warm
    500: 'oklch(0.55 0.18 60)',   // Base warm (main accent)
    600: 'oklch(0.45 0.21 60)',   // Dark medium warm
    700: 'oklch(0.35 0.24 60)',   // Dark warm
    800: 'oklch(0.25 0.27 60)',   // Very dark warm
    900: 'oklch(0.15 0.3 60)',    // Darkest warm
  },

  // Semantic colors
  success: {
    50: 'oklch(0.97 0.02 140)',   // Very light green
    100: 'oklch(0.92 0.04 140)',  // Light green
    200: 'oklch(0.85 0.08 140)',  // Lighter green
    300: 'oklch(0.75 0.12 140)',  // Light medium green
    400: 'oklch(0.65 0.16 140)',  // Medium green
    500: 'oklch(0.55 0.2 140)',   // Base green
    600: 'oklch(0.45 0.24 140)',  // Dark medium green
    700: 'oklch(0.35 0.28 140)',  // Dark green
    800: 'oklch(0.25 0.32 140)',  // Very dark green
    900: 'oklch(0.15 0.36 140)',  // Darkest green
  },

  warning: {
    50: 'oklch(0.97 0.03 85)',    // Very light yellow
    100: 'oklch(0.92 0.06 85)',   // Light yellow
    200: 'oklch(0.85 0.09 85)',   // Lighter yellow
    300: 'oklch(0.75 0.12 85)',   // Light medium yellow
    400: 'oklch(0.65 0.15 85)',   // Medium yellow
    500: 'oklch(0.55 0.18 85)',   // Base yellow
    600: 'oklch(0.45 0.21 85)',   // Dark medium yellow
    700: 'oklch(0.35 0.24 85)',   // Dark yellow
    800: 'oklch(0.25 0.27 85)',   // Very dark yellow
    900: 'oklch(0.15 0.3 85)',    // Darkest yellow
  },

  error: {
    50: 'oklch(0.97 0.02 25)',    // Very light red
    100: 'oklch(0.92 0.04 25)',   // Light red
    200: 'oklch(0.85 0.08 25)',   // Lighter red
    300: 'oklch(0.75 0.12 25)',   // Light medium red
    400: 'oklch(0.65 0.16 25)',   // Medium red
    500: 'oklch(0.55 0.2 25)',    // Base red
    600: 'oklch(0.45 0.24 25)',   // Dark medium red
    700: 'oklch(0.35 0.28 25)',   // Dark red
    800: 'oklch(0.25 0.32 25)',   // Very dark red
    900: 'oklch(0.15 0.36 25)',   // Darkest red
  },

  info: {
    50: 'oklch(0.97 0.02 240)',   // Very light blue
    100: 'oklch(0.92 0.04 240)',  // Light blue
    200: 'oklch(0.85 0.08 240)',  // Lighter blue
    300: 'oklch(0.75 0.12 240)',  // Light medium blue
    400: 'oklch(0.65 0.16 240)',  // Medium blue
    500: 'oklch(0.55 0.2 240)',   // Base blue
    600: 'oklch(0.45 0.24 240)',  // Dark medium blue
    700: 'oklch(0.35 0.28 240)',  // Dark blue
    800: 'oklch(0.25 0.32 240)',  // Very dark blue
    900: 'oklch(0.15 0.36 240)',  // Darkest blue
  },
} as const;

// Semantic color aliases for easier usage
export const semanticColors = {
  // Background colors
  background: {
    primary: colors.neutral[50],
    secondary: colors.neutral[100],
    tertiary: colors.neutral[200],
    inverse: colors.neutral[900],
  },

  // Foreground colors
  foreground: {
    primary: colors.neutral[900],
    secondary: colors.neutral[700],
    tertiary: colors.neutral[600],
    inverse: colors.neutral[50],
    onColor: colors.neutral[50],
  },

  // Border colors
  border: {
    default: colors.neutral[300],
    subtle: colors.neutral[200],
    strong: colors.neutral[400],
    inverse: colors.neutral[700],
  },

  // Surface colors (cards, panels, etc.)
  surface: {
    primary: colors.neutral[50],
    secondary: colors.neutral[100],
    tertiary: colors.neutral[200],
    inverse: colors.neutral[900],
  },

  // Interactive colors
  interactive: {
    primary: {
      default: colors.primary[500],
      hover: colors.primary[600],
      pressed: colors.primary[700],
      disabled: colors.primary[300],
      background: colors.primary[50],
    },
    secondary: {
      default: colors.secondary[500],
      hover: colors.secondary[600],
      pressed: colors.secondary[700],
      disabled: colors.secondary[300],
      background: colors.secondary[50],
    },
    accent: {
      default: colors.accent[500],
      hover: colors.accent[600],
      pressed: colors.accent[700],
      disabled: colors.accent[300],
      background: colors.accent[50],
    },
  },

  // Status colors
  status: {
    success: {
      default: colors.success[500],
      background: colors.success[50],
      border: colors.success[200],
    },
    warning: {
      default: colors.warning[500],
      background: colors.warning[50],
      border: colors.warning[200],
    },
    error: {
      default: colors.error[500],
      background: colors.error[50],
      border: colors.error[200],
    },
    info: {
      default: colors.info[500],
      background: colors.info[50],
      border: colors.info[200],
    },
  },
} as const;

export type ColorToken = typeof colors;
export type SemanticColorToken = typeof semanticColors;

