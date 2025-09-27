/**
 * Design System - Border Radius Tokens
 * Consistent border radius scale for rounded corners
 */

export const borderRadius = {
  // Base radii
  none: '0',
  xs: '0.125rem',  // 2px
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',  // Fully rounded (pill/circle)
} as const;

// Semantic border radius tokens
export const semanticBorderRadius = {
  // Component-specific radii
  component: {
    button: {
      sm: borderRadius.sm,
      md: borderRadius.md,
      lg: borderRadius.lg,
    },
    input: {
      sm: borderRadius.sm,
      md: borderRadius.md,
      lg: borderRadius.lg,
    },
    card: {
      sm: borderRadius.lg,
      md: borderRadius.xl,
      lg: borderRadius['2xl'],
    },
    modal: {
      sm: borderRadius.lg,
      md: borderRadius.xl,
      lg: borderRadius['2xl'],
    },
    tooltip: borderRadius.sm,
    badge: borderRadius.full,
    avatar: {
      sm: borderRadius.sm,
      md: borderRadius.md,
      lg: borderRadius.lg,
      xl: borderRadius.xl,
      full: borderRadius.full,
    },
  },

  // Layout-specific radii
  layout: {
    container: borderRadius.xl,
    section: borderRadius['2xl'],
    page: borderRadius['3xl'],
  },
} as const;

export type BorderRadiusToken = typeof borderRadius;
export type SemanticBorderRadiusToken = typeof semanticBorderRadius;
