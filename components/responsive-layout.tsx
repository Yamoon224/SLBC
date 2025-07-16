"use client"

import type React from "react"

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveLayout({ children, className = "" }: ResponsiveLayoutProps) {
  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      {/* Desktop: 2 colonnes, Mobile: stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">{children}</div>
    </div>
  )
}

interface ResponsiveCardGridProps {
  children: React.ReactNode
  columns?: {
    mobile: number
    tablet: number
    desktop: number
  }
}

export function ResponsiveCardGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
}: ResponsiveCardGridProps) {
  const gridClasses = `grid gap-4 md:gap-6 
    grid-cols-${columns.mobile} 
    md:grid-cols-${columns.tablet} 
    lg:grid-cols-${columns.desktop}`

  return <div className={gridClasses}>{children}</div>
}
