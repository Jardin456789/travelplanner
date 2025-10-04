import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const stackVariants = cva('', {
  variants: {
    // Layout direction
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },

    // Layout type
    layout: {
      flex: 'flex',
      grid: 'grid',
    },

    // Alignment
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },

    // Justification
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
      stretch: 'justify-stretch',
    },

    // Spacing between items
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      7: 'gap-7',
      8: 'gap-8',
      9: 'gap-9',
      10: 'gap-10',
      12: 'gap-12',
      14: 'gap-14',
      16: 'gap-16',
      18: 'gap-18',
      20: 'gap-20',
      24: 'gap-24',
    },

    // Wrap behavior
    wrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },

    // Grid columns (for grid layout)
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    },

    // Grid rows (for grid layout)
    rows: {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
    },

    // Grid flow
    flow: {
      row: 'grid-flow-row',
      col: 'grid-flow-col',
      'row-dense': 'grid-flow-row-dense',
      'col-dense': 'grid-flow-col-dense',
    },
  },
  defaultVariants: {
    layout: 'flex',
    direction: 'column',
    align: 'stretch',
    gap: 0,
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  asChild?: boolean;
  as?: React.ElementType;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({
    className,
    layout,
    direction,
    align,
    justify,
    gap,
    wrap,
    columns,
    rows,
    flow,
    as,
    ...props
  }, ref) => {
    const Comp = as || 'div';

    return (
      <Comp
        className={cn(
          stackVariants({
            layout,
            direction,
            align,
            justify,
            gap,
            wrap,
            columns,
            rows,
            flow,
          }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Stack.displayName = 'Stack';

export { Stack, stackVariants };

// Convenience components for common use cases
export const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction' | 'layout'>>(
  (props, ref) => <Stack ref={ref} direction="row" layout="flex" {...props} />
);
HStack.displayName = 'HStack';

export const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction' | 'layout'>>(
  (props, ref) => <Stack ref={ref} direction="column" layout="flex" {...props} />
);
VStack.displayName = 'VStack';

export const Grid = React.forwardRef<HTMLDivElement, Omit<StackProps, 'layout'>>(
  (props, ref) => <Stack ref={ref} layout="grid" {...props} />
);
Grid.displayName = 'Grid';

