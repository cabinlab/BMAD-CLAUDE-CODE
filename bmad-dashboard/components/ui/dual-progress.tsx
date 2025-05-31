"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DualProgressProps {
  business: number;
  technical: number;
  className?: string;
  showLabels?: boolean;
}

const DualProgress = React.forwardRef<HTMLDivElement, DualProgressProps>(
  ({ business, technical, className, showLabels = false }, ref) => {
    // Each segment represents its actual percentage, not doubled
    const businessPercent = Math.max(0, Math.min(100, business));
    const technicalPercent = Math.max(0, Math.min(100, technical));
    
    return (
      <div className={cn("w-full", className)} ref={ref}>
        <div className="relative h-3 w-full overflow-hidden rounded-md bg-secondary/50">
          <div className="flex h-full">
            <div 
              className="bg-business transition-all duration-300 ease-in-out"
              style={{ width: `${businessPercent}%` }}
            />
            <div 
              className="bg-technical transition-all duration-300 ease-in-out"
              style={{ width: `${technicalPercent}%` }}
            />
          </div>
        </div>
        {showLabels && (
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-business rounded-full mr-1"></div>
              Business: {business}%
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-technical rounded-full mr-1"></div>
              Technical: {technical}%
            </span>
          </div>
        )}
      </div>
    );
  }
);

DualProgress.displayName = "DualProgress";

export { DualProgress };