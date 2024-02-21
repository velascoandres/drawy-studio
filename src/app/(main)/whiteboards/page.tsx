import React from 'react'

import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { IMAGES } from '@/constants/images'

const WhiteboardsPage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      <EmptyState 
        title="Welcome!" 
        description="Start adding a whiteboard or just select one to continue" 
        image={IMAGES.START_STATE} 
      />
    </main>
  )
}

export default WhiteboardsPage