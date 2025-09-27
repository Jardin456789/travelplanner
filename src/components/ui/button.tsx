import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-primary shadow-sm hover:shadow-md",
        destructive:
          "bg-error text-white hover:bg-error-hover focus-visible:ring-error shadow-sm hover:shadow-md",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary shadow-sm hover:shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:ring-secondary shadow-sm hover:shadow-md",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary",
        success: "bg-success text-white hover:bg-success-hover focus-visible:ring-success shadow-sm hover:shadow-md",
        warning: "bg-warning text-white hover:bg-warning-hover focus-visible:ring-warning shadow-sm hover:shadow-md",
      },
      size: {
        xs: "h-7 px-2 text-xs gap-1.5 has-[>svg]:px-1.5",
        sm: "h-8 px-3 text-sm gap-1.5 has-[>svg]:px-2.5",
        default: "h-9 px-4 py-2 text-sm has-[>svg]:px-3",
        lg: "h-10 px-6 text-base has-[>svg]:px-4",
        xl: "h-12 px-8 text-lg has-[>svg]:px-5",
        icon: "size-9",
        "icon-sm": "size-7",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
