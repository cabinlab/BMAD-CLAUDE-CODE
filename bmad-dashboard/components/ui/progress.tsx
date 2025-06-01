"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-md bg-secondary/50",
        className
      )}
      {...props}
    >
      <div
        className="h-full transition-all duration-300 ease-in-out"
        style={{ 
          width: `${Math.max(0, Math.min(100, value))}%`,
          backgroundColor: '#4FC3C1'  // Cyan complementary to Claude orange
        }}
      />
    </div>
  )
);

Progress.displayName = "Progress";

export { Progress }