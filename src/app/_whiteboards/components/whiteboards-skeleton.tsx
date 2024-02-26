import React from 'react'

import { Skeleton } from '@/app/_shared/components/ui/skeleton'

export const WhiteboardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 w-full">
      <Skeleton className="bg-gray-600 h-[30rem] w-full md:max-w-sm rounded-md" />
      <Skeleton className="bg-gray-600 h-[30rem] w-full md:max-w-sm rounded-md" />
      <Skeleton className="bg-gray-600 h-[30rem] w-full md:max-w-sm rounded-md" />
      <Skeleton className="bg-gray-600 h-[30rem] w-full md:max-w-sm rounded-md" />
    </div>
  )
}
