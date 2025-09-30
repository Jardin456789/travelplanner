/**
 * Design System - Spacing Tokens
 * Consistent spacing scale using a base unit approach
 */

export const spacing = {
  // Base unit (4px)
  unit: '0.25rem',

  // Spacing scale (multiples of base unit)
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  18: '4.5rem',     // 72px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 256px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// Semantic spacing tokens
export const semanticSpacing = {
  // Layout spacing
  layout: {
    container: {
      padding: {
        xs: spacing[3],
        sm: spacing[4],
        md: spacing[6],
        lg: spacing[8],
        xl: spacing[12],
      },
    },
    section: {
      margin: {
        xs: spacing[6],
        sm: spacing[8],
        md: spacing[12],
        lg: spacing[16],
        xl: spacing[20],
      },
    },
    page: {
      padding: {
        xs: spacing[4],
        sm: spacing[6],
        md: spacing[8],
        lg: spacing[12],
        xl: spacing[16],
      },
    },
  },

  // Component spacing
  component: {
    padding: {
      xs: spacing[2],
      sm: spacing[3],
      md: spacing[4],
      lg: spacing[6],
      xl: spacing[8],
    },
    margin: {
      xs: spacing[1],
      sm: spacing[2],
      md: spacing[3],
      lg: spacing[4],
      xl: spacing[6],
    },
    gap: {
      xs: spacing[1],
      sm: spacing[2],
      md: spacing[3],
      lg: spacing[4],
      xl: spacing[6],
      '2xl': spacing[8],
    },
  },

  // Content spacing
  content: {
    paragraph: {
      margin: spacing[4],
    },
    heading: {
      margin: {
        top: spacing[6],
        bottom: spacing[3],
      },
    },
    list: {
      item: {
        margin: spacing[2],
      },
    },
  },
} as const;

export type SpacingToken = typeof spacing;
export type SemanticSpacingToken = typeof semanticSpacing;

