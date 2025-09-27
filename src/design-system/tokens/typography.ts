/**
 * Design System - Typography Tokens
 * Consistent typography scale with semantic naming
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['var(--font-geist-mono)', 'monospace'],
    display: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
  },

  // Font sizes (using rem for scalability)
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem',    // 128px
  },

  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Text styles (semantic combinations)
  textStyle: {
    // Display styles (headings)
    display: {
      '2xl': {
        fontSize: 'fontSize.7xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.tight',
        letterSpacing: 'letterSpacing.tight',
      },
      xl: {
        fontSize: 'fontSize.6xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.tight',
        letterSpacing: 'letterSpacing.tight',
      },
      lg: {
        fontSize: 'fontSize.5xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.tight',
        letterSpacing: 'letterSpacing.tight',
      },
      md: {
        fontSize: 'fontSize.4xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.tight',
        letterSpacing: 'letterSpacing.tight',
      },
      sm: {
        fontSize: 'fontSize.3xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.tight',
        letterSpacing: 'letterSpacing.tight',
      },
      xs: {
        fontSize: 'fontSize.2xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.tight',
        letterSpacing: 'letterSpacing.tight',
      },
    },

    // Heading styles
    heading: {
      '6xl': {
        fontSize: 'fontSize.5xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.tight',
        letterSpacing: 'letterSpacing.tight',
      },
      '5xl': {
        fontSize: 'fontSize.4xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.tight',
        letterSpacing: 'letterSpacing.tight',
      },
      '4xl': {
        fontSize: 'fontSize.3xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.tight',
        letterSpacing: 'letterSpacing.tight',
      },
      '3xl': {
        fontSize: 'fontSize.2xl',
        fontWeight: 'fontWeight.bold',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.tight',
      },
      '2xl': {
        fontSize: 'fontSize.xl',
        fontWeight: 'fontWeight.semibold',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.tight',
      },
      xl: {
        fontSize: 'fontSize.lg',
        fontWeight: 'fontWeight.semibold',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.tight',
      },
      lg: {
        fontSize: 'fontSize.base',
        fontWeight: 'fontWeight.semibold',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.normal',
      },
      md: {
        fontSize: 'fontSize.sm',
        fontWeight: 'fontWeight.semibold',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.normal',
      },
      sm: {
        fontSize: 'fontSize.xs',
        fontWeight: 'fontWeight.semibold',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.normal',
      },
    },

    // Body text styles
    body: {
      '2xl': {
        fontSize: 'fontSize.2xl',
        fontWeight: 'fontWeight.normal',
        lineHeight: 'lineHeight.relaxed',
        letterSpacing: 'letterSpacing.normal',
      },
      xl: {
        fontSize: 'fontSize.xl',
        fontWeight: 'fontWeight.normal',
        lineHeight: 'lineHeight.relaxed',
        letterSpacing: 'letterSpacing.normal',
      },
      lg: {
        fontSize: 'fontSize.lg',
        fontWeight: 'fontWeight.normal',
        lineHeight: 'lineHeight.relaxed',
        letterSpacing: 'letterSpacing.normal',
      },
      md: {
        fontSize: 'fontSize.base',
        fontWeight: 'fontWeight.normal',
        lineHeight: 'lineHeight.relaxed',
        letterSpacing: 'letterSpacing.normal',
      },
      sm: {
        fontSize: 'fontSize.sm',
        fontWeight: 'fontWeight.normal',
        lineHeight: 'lineHeight.normal',
        letterSpacing: 'letterSpacing.normal',
      },
      xs: {
        fontSize: 'fontSize.xs',
        fontWeight: 'fontWeight.normal',
        lineHeight: 'lineHeight.normal',
        letterSpacing: 'letterSpacing.normal',
      },
    },

    // UI text styles (buttons, labels, etc.)
    ui: {
      lg: {
        fontSize: 'fontSize.lg',
        fontWeight: 'fontWeight.medium',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.normal',
      },
      md: {
        fontSize: 'fontSize.base',
        fontWeight: 'fontWeight.medium',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.normal',
      },
      sm: {
        fontSize: 'fontSize.sm',
        fontWeight: 'fontWeight.medium',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.normal',
      },
      xs: {
        fontSize: 'fontSize.xs',
        fontWeight: 'fontWeight.medium',
        lineHeight: 'lineHeight.snug',
        letterSpacing: 'letterSpacing.normal',
      },
    },

    // Code styles
    code: {
      sm: {
        fontSize: 'fontSize.sm',
        fontWeight: 'fontWeight.normal',
        lineHeight: 'lineHeight.normal',
        letterSpacing: 'letterSpacing.normal',
        fontFamily: 'fontFamily.mono',
      },
      base: {
        fontSize: 'fontSize.base',
        fontWeight: 'fontWeight.normal',
        lineHeight: 'lineHeight.normal',
        letterSpacing: 'letterSpacing.normal',
        fontFamily: 'fontFamily.mono',
      },
    },
  },
} as const;

export type TypographyToken = typeof typography;
