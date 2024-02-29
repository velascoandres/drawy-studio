import React from 'react'

import { Skeleton } from '@/app/_shared/components/ui/skeleton'

export const SpaceCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 w-full gap-2">
      <Skeleton className="h-40 w-full md:max-w-sm" />
      <Skeleton className="h-40 w-full md:max-w-sm" />
      <Skeleton className="h-40 w-full md:max-w-sm" />
    </div>
  )
}
