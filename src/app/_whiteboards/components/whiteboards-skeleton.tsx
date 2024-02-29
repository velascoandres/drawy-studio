import React from 'react'

import { Skeleton } from '@/app/_shared/components/ui/skeleton'

export const WhiteboardsSkeleton = () => {
  return (
    <div className="grid-view">
      <Skeleton className="h-[16rem] w-full md:max-w-sm rounded-md" />
      <Skeleton className="h-[16rem] w-full md:max-w-sm rounded-md" />
      <Skeleton className="h-[16rem] w-full md:max-w-sm rounded-md" />
    </div>
  )
}
