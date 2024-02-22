'use client'

import React from 'react'

import { type Content, Whiteboard } from '@/app/_whiteboards/components/whiteboard'
import { useWhiteboard } from '@/app/_whiteboards/hooks/use-whiteboard'

const WhiteboardPage = () => {
  const { onChangeHandler, whiteboard } = useWhiteboard()


  return (
    <main className="h-full w-full">
      {
        whiteboard && (
          <Whiteboard
            id={whiteboard?.id ?? 0} 
            initialContent={whiteboard?.content as Content} 
            onChange={onChangeHandler} 
          />
        )
      }
      
    </main>
  )
}


export default WhiteboardPage

