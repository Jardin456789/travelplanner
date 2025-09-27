import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const boxVariants = cva('', {
  variants: {
    display: {
      block: 'block',
      inline: 'inline',
      inlineBlock: 'inline-block',
      flex: 'flex',
      inlineFlex: 'inline-flex',
      grid: 'grid',
      inlineGrid: 'inline-grid',
      none: 'hidden',
    },
    position: {
      static: 'static',
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky',
    },
    overflow: {
      visible: 'overflow-visible',
      hidden: 'overflow-hidden',
      scroll: 'overflow-scroll',
      auto: 'overflow-auto',
    },
    cursor: {
      auto: 'cursor-auto',
      default: 'cursor-default',
      pointer: 'cursor-pointer',
      wait: 'cursor-wait',
      text: 'cursor-text',
      move: 'cursor-move',
      notAllowed: 'cursor-not-allowed',
    },
  },
  defaultVariants: {
    display: 'block',
    position: 'static',
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean;
  as?: React.ElementType;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, display, position, overflow, cursor, asChild, as, ...props }, ref) => {
    const Comp = as || 'div';

    return (
      <Comp
        className={cn(boxVariants({ display, position, overflow, cursor, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Box.displayName = 'Box';

export { Box, boxVariants };
