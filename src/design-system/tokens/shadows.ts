/**
 * Design System - Shadow Tokens
 * Consistent shadow scale for depth and elevation
 */

export const shadows = {
  // Base shadows
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Colored shadows
  colored: {
    primary: '0 4px 14px 0 rgb(59 130 246 / 0.15)',
    secondary: '0 4px 14px 0 rgb(34 197 94 / 0.15)',
    accent: '0 4px 14px 0 rgb(245 158 11 / 0.15)',
    error: '0 4px 14px 0 rgb(239 68 68 / 0.15)',
  },

  // Inner shadows
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Special shadows
  glow: {
    primary: '0 0 20px rgb(59 130 246 / 0.3)',
    secondary: '0 0 20px rgb(34 197 94 / 0.3)',
    accent: '0 0 20px rgb(245 158 11 / 0.3)',
  },
} as const;

// Semantic shadow tokens
export const semanticShadows = {
  // Component elevation levels
  elevation: {
    0: shadows.none,      // Flat (no shadow)
    1: shadows.xs,        // Subtle elevation
    2: shadows.sm,        // Low elevation
    3: shadows.md,        // Medium elevation
    4: shadows.lg,        // High elevation
    5: shadows.xl,        // Very high elevation
    6: shadows['2xl'],    // Maximum elevation
  },

  // Component-specific shadows
  component: {
    button: {
      default: shadows.sm,
      hover: shadows.md,
      pressed: shadows.xs,
    },
    card: {
      default: shadows.sm,
      hover: shadows.md,
      elevated: shadows.lg,
    },
    modal: shadows.xl,
    tooltip: shadows.md,
    dropdown: shadows.lg,
    navigation: shadows.sm,
  },

  // Focus shadows
  focus: {
    default: '0 0 0 2px rgb(59 130 246 / 0.2)',
    error: '0 0 0 2px rgb(239 68 68 / 0.2)',
    success: '0 0 0 2px rgb(34 197 94 / 0.2)',
  },
} as const;

export type ShadowToken = typeof shadows;
export type SemanticShadowToken = typeof semanticShadows;

