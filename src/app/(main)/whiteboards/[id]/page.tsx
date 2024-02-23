'use client'

import React from 'react'
import { useParams } from 'next/navigation'

import { type Content, Whiteboard } from '@/app/_whiteboards/components/whiteboard'
import { useWhiteboard } from '@/app/_whiteboards/hooks/use-whiteboard'

const WhiteboardPage = () => {
  const params = useParams()

  const { onChangeHandler, whiteboard } = useWhiteboard(Number(params.id))


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

