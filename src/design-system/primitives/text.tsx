import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    // Text size variants
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },

    // Font weight variants
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },

    // Font family variants
    family: {
      sans: 'font-sans',
      mono: 'font-mono',
    },

    // Text alignment
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },

    // Text color variants
    color: {
      default: 'text-foreground',
      secondary: 'text-foreground-secondary',
      tertiary: 'text-foreground-tertiary',
      inverse: 'text-foreground-inverse',
      primary: 'text-primary',
      accent: 'text-accent',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-red-600 dark:text-red-400',
      info: 'text-blue-600 dark:text-blue-400',
    },

    // Text decoration
    decoration: {
      none: 'no-underline',
      underline: 'underline',
      lineThrough: 'line-through',
    },

    // Line height
    lineHeight: {
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },

    // Letter spacing
    letterSpacing: {
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest',
    },

    // Text transform
    transform: {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
      normal: 'normal-case',
    },

    // White space
    whiteSpace: {
      normal: 'whitespace-normal',
      nowrap: 'whitespace-nowrap',
      pre: 'whitespace-pre',
      preLine: 'whitespace-pre-line',
      preWrap: 'whitespace-pre-wrap',
    },

    // Text overflow
    truncate: {
      true: 'truncate',
      false: '',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    color: 'default',
    align: 'left',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
});

// Semantic text style variants
const semanticTextVariants = cva('', {
  variants: {
    // Heading styles
    variant: {
      // Display headings
      display1: 'text-7xl font-bold leading-tight tracking-tight',
      display2: 'text-6xl font-bold leading-tight tracking-tight',
      display3: 'text-5xl font-bold leading-tight tracking-tight',
      display4: 'text-4xl font-bold leading-tight tracking-tight',

      // Headings
      h1: 'text-3xl font-semibold leading-snug tracking-tight',
      h2: 'text-2xl font-semibold leading-snug tracking-tight',
      h3: 'text-xl font-semibold leading-snug tracking-tight',
      h4: 'text-lg font-semibold leading-snug tracking-normal',
      h5: 'text-base font-semibold leading-snug tracking-normal',
      h6: 'text-sm font-semibold leading-snug tracking-normal',

      // Body text
      body1: 'text-base font-normal leading-relaxed tracking-normal',
      body2: 'text-sm font-normal leading-relaxed tracking-normal',
      body3: 'text-xs font-normal leading-normal tracking-normal',

      // UI text
      caption: 'text-xs font-medium leading-normal tracking-normal',
      label: 'text-sm font-medium leading-snug tracking-normal',
      button: 'text-sm font-medium leading-snug tracking-normal',

      // Code
      code: 'text-sm font-mono leading-normal tracking-normal',
    },
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof textVariants>,
    VariantProps<typeof semanticTextVariants> {
  asChild?: boolean;
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({
    className,
    size,
    weight,
    family,
    align,
    color,
    decoration,
    lineHeight,
    letterSpacing,
    transform,
    whiteSpace,
    truncate,
    variant,
    as,
    ...props
  }, ref) => {
    const Comp = as || 'span';

    return (
      <Comp
        className={cn(
          textVariants({
            size,
            weight,
            family,
            align,
            color,
            decoration,
            lineHeight,
            letterSpacing,
            transform,
            whiteSpace,
            truncate,
          }),
          semanticTextVariants({ variant }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants, semanticTextVariants };
