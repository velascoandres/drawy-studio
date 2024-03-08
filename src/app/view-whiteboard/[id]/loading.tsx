import React from 'react'

import { Skeleton } from '@/app/_shared/components/ui/skeleton'

const LoadingPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center z-10">
      <Skeleton className="w-full h-[300px]" />
    </div>
  )
}


export default LoadingPage
