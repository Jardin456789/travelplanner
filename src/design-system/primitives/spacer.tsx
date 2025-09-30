import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spacerVariants = cva('flex-shrink-0', {
  variants: {
    // Fixed spacing values
    size: {
      0: 'w-0 h-0',
      1: 'w-1 h-1',
      2: 'w-2 h-2',
      3: 'w-3 h-3',
      4: 'w-4 h-4',
      5: 'w-5 h-5',
      6: 'w-6 h-6',
      7: 'w-7 h-7',
      8: 'w-8 h-8',
      9: 'w-9 h-9',
      10: 'w-10 h-10',
      12: 'w-12 h-12',
      14: 'w-14 h-14',
      16: 'w-16 h-16',
      18: 'w-18 h-18',
      20: 'w-20 h-20',
      24: 'w-24 h-24',
      28: 'w-28 h-28',
      32: 'w-32 h-32',
      36: 'w-36 h-36',
      40: 'w-40 h-40',
      44: 'w-44 h-44',
      48: 'w-48 h-48',
      52: 'w-52 h-52',
      56: 'w-56 h-56',
      60: 'w-60 h-60',
      64: 'w-64 h-64',
      72: 'w-72 h-72',
      80: 'w-80 h-80',
      96: 'w-96 h-96',
    },

    // Direction-specific spacing
    direction: {
      horizontal: '',
      vertical: '',
    },

    // Grow behavior
    grow: {
      true: 'flex-grow',
      false: '',
    },
  },
  compoundVariants: [
    {
      direction: 'horizontal',
      size: 1,
      class: 'w-1 h-auto',
    },
    {
      direction: 'horizontal',
      size: 2,
      class: 'w-2 h-auto',
    },
    {
      direction: 'horizontal',
      size: 3,
      class: 'w-3 h-auto',
    },
    {
      direction: 'horizontal',
      size: 4,
      class: 'w-4 h-auto',
    },
    {
      direction: 'horizontal',
      size: 5,
      class: 'w-5 h-auto',
    },
    {
      direction: 'horizontal',
      size: 6,
      class: 'w-6 h-auto',
    },
    {
      direction: 'horizontal',
      size: 7,
      class: 'w-7 h-auto',
    },
    {
      direction: 'horizontal',
      size: 8,
      class: 'w-8 h-auto',
    },
    {
      direction: 'horizontal',
      size: 9,
      class: 'w-9 h-auto',
    },
    {
      direction: 'horizontal',
      size: 10,
      class: 'w-10 h-auto',
    },
    {
      direction: 'horizontal',
      size: 12,
      class: 'w-12 h-auto',
    },
    {
      direction: 'horizontal',
      size: 14,
      class: 'w-14 h-auto',
    },
    {
      direction: 'horizontal',
      size: 16,
      class: 'w-16 h-auto',
    },
    {
      direction: 'horizontal',
      size: 18,
      class: 'w-18 h-auto',
    },
    {
      direction: 'horizontal',
      size: 20,
      class: 'w-20 h-auto',
    },
    {
      direction: 'horizontal',
      size: 24,
      class: 'w-24 h-auto',
    },
    {
      direction: 'horizontal',
      size: 28,
      class: 'w-28 h-auto',
    },
    {
      direction: 'horizontal',
      size: 32,
      class: 'w-32 h-auto',
    },
    {
      direction: 'horizontal',
      size: 36,
      class: 'w-36 h-auto',
    },
    {
      direction: 'horizontal',
      size: 40,
      class: 'w-40 h-auto',
    },
    {
      direction: 'horizontal',
      size: 44,
      class: 'w-44 h-auto',
    },
    {
      direction: 'horizontal',
      size: 48,
      class: 'w-48 h-auto',
    },
    {
      direction: 'horizontal',
      size: 52,
      class: 'w-52 h-auto',
    },
    {
      direction: 'horizontal',
      size: 56,
      class: 'w-56 h-auto',
    },
    {
      direction: 'horizontal',
      size: 60,
      class: 'w-60 h-auto',
    },
    {
      direction: 'horizontal',
      size: 64,
      class: 'w-64 h-auto',
    },
    {
      direction: 'horizontal',
      size: 72,
      class: 'w-72 h-auto',
    },
    {
      direction: 'horizontal',
      size: 80,
      class: 'w-80 h-auto',
    },
    {
      direction: 'horizontal',
      size: 96,
      class: 'w-96 h-auto',
    },
    {
      direction: 'vertical',
      size: 1,
      class: 'h-1 w-auto',
    },
    {
      direction: 'vertical',
      size: 2,
      class: 'h-2 w-auto',
    },
    {
      direction: 'vertical',
      size: 3,
      class: 'h-3 w-auto',
    },
    {
      direction: 'vertical',
      size: 4,
      class: 'h-4 w-auto',
    },
    {
      direction: 'vertical',
      size: 5,
      class: 'h-5 w-auto',
    },
    {
      direction: 'vertical',
      size: 6,
      class: 'h-6 w-auto',
    },
    {
      direction: 'vertical',
      size: 7,
      class: 'h-7 w-auto',
    },
    {
      direction: 'vertical',
      size: 8,
      class: 'h-8 w-auto',
    },
    {
      direction: 'vertical',
      size: 9,
      class: 'h-9 w-auto',
    },
    {
      direction: 'vertical',
      size: 10,
      class: 'h-10 w-auto',
    },
    {
      direction: 'vertical',
      size: 12,
      class: 'h-12 w-auto',
    },
    {
      direction: 'vertical',
      size: 14,
      class: 'h-14 w-auto',
    },
    {
      direction: 'vertical',
      size: 16,
      class: 'h-16 w-auto',
    },
    {
      direction: 'vertical',
      size: 18,
      class: 'h-18 w-auto',
    },
    {
      direction: 'vertical',
      size: 20,
      class: 'h-20 w-auto',
    },
    {
      direction: 'vertical',
      size: 24,
      class: 'h-24 w-auto',
    },
    {
      direction: 'vertical',
      size: 28,
      class: 'h-28 w-auto',
    },
    {
      direction: 'vertical',
      size: 32,
      class: 'h-32 w-auto',
    },
    {
      direction: 'vertical',
      size: 36,
      class: 'h-36 w-auto',
    },
    {
      direction: 'vertical',
      size: 40,
      class: 'h-40 w-auto',
    },
    {
      direction: 'vertical',
      size: 44,
      class: 'h-44 w-auto',
    },
    {
      direction: 'vertical',
      size: 48,
      class: 'h-48 w-auto',
    },
    {
      direction: 'vertical',
      size: 52,
      class: 'h-52 w-auto',
    },
    {
      direction: 'vertical',
      size: 56,
      class: 'h-56 w-auto',
    },
    {
      direction: 'vertical',
      size: 60,
      class: 'h-60 w-auto',
    },
    {
      direction: 'vertical',
      size: 64,
      class: 'h-64 w-auto',
    },
    {
      direction: 'vertical',
      size: 72,
      class: 'h-72 w-auto',
    },
    {
      direction: 'vertical',
      size: 80,
      class: 'h-80 w-auto',
    },
    {
      direction: 'vertical',
      size: 96,
      class: 'h-96 w-auto',
    },
  ],
  defaultVariants: {
    size: 4,
    grow: false,
  },
});

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size, direction, grow, ...props }, ref) => {
    return (
      <div
        className={cn(spacerVariants({ size, direction, grow }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

export { Spacer, spacerVariants };

