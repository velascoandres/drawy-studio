'use server'

import React from 'react'
import { redirect } from 'next/navigation'

import { WhiterboardFromCompressed } from '@/app/_whiteboards/components/whiteboard'
import { WhiteboardHeader } from '@/app/_whiteboards/components/whiteboard-header'
import findWhiteboardContent from '@/server/api/whiteboard/usecases/find-whiteboard-content'
import { db } from '@/server/db'


const getWhiteboard = async (id: number) => {
  const whiteboard = await findWhiteboardContent(db, { id, isPublic: true })

  if (!whiteboard){
    redirect('/not-found')
  }

  return whiteboard
}



const WhitebardViewPage = async ({ params }: {params: {id: string}}) => {
  const whiteboardId = Number(params.id)
 
  const whiteboard = await getWhiteboard(whiteboardId)
  
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