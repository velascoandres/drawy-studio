import React from 'react'

import { Skeleton } from '@/app/_shared/components/ui/skeleton'

export const WhiteboardsSkeleton = () => {
  return (
    <>
      <Skeleton className="bg-gray-600 w-[28rem] rounded-md h-72" />
      <Skeleton className="bg-gray-600 w-[28rem] rounded-md h-72" />
      <Skeleton className="bg-gray-600 w-[28rem] rounded-md h-72" />
    </>
  )
}
