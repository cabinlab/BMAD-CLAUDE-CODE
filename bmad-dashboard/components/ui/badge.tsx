import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-accent text-white dark:text-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border text-foreground"
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )} 
      {...props} 
    />
  )
}

export { Badge }