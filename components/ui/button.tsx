import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        cta: "bg-cta text-cta-ink hover:bg-[#f0d070] shadow-[0_0_32px_rgba(230,195,92,0.18)]",
        secondary:
          "bg-transparent text-bone hairline hover:bg-bone/5",
        ghost: "bg-transparent text-mute hover:text-bone hover:bg-bone/5",
        danger: "bg-danger-dim text-danger hover:bg-danger/20",
      },
      size: {
        default: "h-12 px-5",
        lg: "h-14 px-6 text-base",
        sm: "h-10 px-4 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "cta",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
