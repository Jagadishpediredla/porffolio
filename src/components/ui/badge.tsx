import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base styles - increased font size slightly
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        // Secondary: Use a slightly lighter background for better contrast
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Outline: Use a subtle border matching the theme
        outline: "text-foreground border-border hover:bg-accent/10", // Added subtle hover
      },
    },
    defaultVariants: {
      variant: "secondary", // Changed default to secondary for better visibility on dark bg
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, // Changed HTMLDivElement to HTMLSpanElement
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} /> // Changed div to span
  )
}

export { Badge, badgeVariants }
