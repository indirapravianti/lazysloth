import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const quirkyButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-100 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1",
        secondary:
          "bg-secondary text-secondary-foreground shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1",
        accent:
          "bg-accent text-accent-foreground shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1",
        outline:
          "bg-card text-foreground shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1",
        ghost:
          "border-transparent hover:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
        quirkyPink:
          "bg-quirky-pink text-primary-foreground shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
        quirkyTeal:
          "bg-quirky-teal text-secondary-foreground shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
        quirkyYellow:
          "bg-quirky-yellow text-accent-foreground shadow-quirky-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg text-sm",
        sm: "h-8 px-3 rounded-md text-xs",
        lg: "h-12 px-8 rounded-lg text-base",
        xl: "h-14 px-10 rounded-xl text-lg",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface QuirkyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof quirkyButtonVariants> {
  asChild?: boolean;
}

const QuirkyButton = React.forwardRef<HTMLButtonElement, QuirkyButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(quirkyButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
QuirkyButton.displayName = "QuirkyButton";

export { QuirkyButton, quirkyButtonVariants };
