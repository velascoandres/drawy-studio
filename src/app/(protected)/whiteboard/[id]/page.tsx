'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { type Content, Whiteboard } from '@/app/_whiteboards/components/whiteboard'
import { WhiteboardNavigation } from '@/app/_whiteboards/components/whiteboard-navigation'
import { useWhiteboard } from '@/app/_whiteboards/hooks/use-whiteboard'

const WhiteboardPage = () => {
  const params = useParams()

  const { onChangeHandler, whiteboard } = useWhiteboard(Number(params.id))

  useEffect(() => {
    if (!whiteboard){
      return
    }

    document.title = `${whiteboard.name} | Drawy`
  }, [whiteboard])


  return (
    <main className="h-screen w-screen">
      {
        whiteboard && (
          <>
            <Whiteboard
              id={whiteboard?.id ?? 0} 
              initialContent={whiteboard?.content as Content} 
              onChange={onChangeHandler} 
            />

            <WhiteboardNavigation whiteboardName={whiteboard.name} spaceId={whiteboard.spaceId} />
          </>
        )
      }
    </main>
  )
}


export default WhiteboardPage

