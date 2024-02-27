import React from 'react'

import { Skeleton } from '../_shared/components/ui/skeleton'

const Loading = () => {
  return (
    <div className="h-[calc(100dvh-85px)] overflow-y-auto z-20 w-screen">
      <div className="fixed w-full top-0 z-10 px-2 mt-2 py-2">
        <Skeleton className="w-full h-[50px]" />
      </div>
      <div className="max-w-screen-2xl flex flex-col gap-4 items-center flex-wrap justify-between mx-auto px-8 mt-20">
        <Skeleton className="w-1/2 h-[50px] px-8" />
        <Skeleton className="w-full h-[500px]" />
      </div>
    </div>
  )
}

export default Loading
