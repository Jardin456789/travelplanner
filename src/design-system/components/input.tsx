import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-error focus-visible:ring-error',
        success: 'border-success focus-visible:ring-success',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-9 px-3 text-sm',
        lg: 'h-11 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, startIcon, endIcon, ...props }, ref) => {
    const inputElement = (
      <input
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );

    if (startIcon || endIcon) {
      return (
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </div>
          )}
          {inputElement}
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {endIcon}
            </div>
          )}
        </div>
      );
    }

    return inputElement;
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
