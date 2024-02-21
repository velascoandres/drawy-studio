'use client'

import React from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/app/_shared/components/ui/resizable'
import { WhiteboardList } from '@/app/_whiteboards/components/whiteboard-list'

export const Layout = ({
  children,
}: {
      children: React.ReactNode;
  }) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[calc(100dvh-62px)] px-3" defaultSize={15} minSize={15}>
        <WhiteboardList />  
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}


export default Layout