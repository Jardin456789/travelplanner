import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'flex min-h-[60px] w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-error focus-visible:ring-error',
        success: 'border-success focus-visible:ring-success',
      },
      size: {
        sm: 'min-h-[40px] px-2 py-1 text-xs',
        default: 'min-h-[60px] px-3 py-2 text-sm',
        lg: 'min-h-[80px] px-4 py-3 text-base',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      resize: 'none',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, resize, maxLength, showCount, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value?.toString() || props.defaultValue?.toString() || '');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      props.onChange?.(e);
    };

    const currentLength = value.length;
    const isOverLimit = maxLength && currentLength > maxLength;

    return (
      <div className="relative">
        <textarea
          className={cn(
            textareaVariants({ variant: isOverLimit ? 'error' : variant, size, resize }),
            className
          )}
          ref={ref}
          maxLength={maxLength}
          {...props}
          onChange={handleChange}
        />
        {showCount && maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {currentLength}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };

