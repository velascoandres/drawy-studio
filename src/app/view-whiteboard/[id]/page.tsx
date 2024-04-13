'use server'

import React from 'react'

import { getPublicWhiteboard } from '@/app/_whiteboards/actions/public-whiteboard'
import { WhiterboardFromCompressed } from '@/app/_whiteboards/components/whiteboard'
import { WhiteboardHeader } from '@/app/_whiteboards/components/whiteboard-header'


const WhitebardViewPage = async ({ params }: {params: {id: string}}) => {
  const whiteboardId = Number(params.id)
 
  const whiteboard = await getPublicWhiteboard(whiteboardId)
  
  return (
    <main className="h-screen w-screen">
      <WhiterboardFromCompressed
        viewModeEnabled
        id={whiteboard?.id} 
        initialRawCompressed={whiteboard.compressedRawContent} 
      />
      <WhiteboardHeader 
        title={whiteboard.name} 
        description={whiteboard.description ?? ''} 
        creator={{
          name: whiteboard.createdBy.name ?? '',
          avatarUrl: whiteboard.createdBy.image ?? ''
        }} 
      />
    </main>
  )
}


export default WhitebardViewPage