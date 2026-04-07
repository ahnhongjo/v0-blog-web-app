"use client"

import { cn } from "@/lib/utils"

interface TagBadgeProps {
  tag: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function TagBadge({ tag, isActive = false, onClick, className }: TagBadgeProps) {
  const Component = onClick ? "button" : "span"

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full transition-colors",
        onClick && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive
          ? "bg-foreground text-background"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        className
      )}
    >
      {tag}
    </Component>
  )
}
