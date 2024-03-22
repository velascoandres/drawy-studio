'use server'

import React from 'react'
import { redirect } from 'next/navigation'

import { type Content,Whiteboard } from '@/app/_whiteboards/components/whiteboard'
import { WhiteboardHeader } from '@/app/_whiteboards/components/whiteboard-header'
import { type PublicWhiteboard } from '@/app/_whiteboards/interfaces/whiteboard'
import findPublicWhiteboardById from '@/server/api/whiteboard/usecases/find-public-whiteboard'
import { db } from '@/server/db'


const getWhiteboard = async (id: number) => {
  const whiteboard = await findPublicWhiteboardById(db, { id })

  if (!whiteboard){
    redirect('/not-found')
  }

  return whiteboard as unknown as PublicWhiteboard & {content: undefined | Content}
}



const WhitebardViewPage = async ({ params }: {params: {id: string}}) => {
  const whiteboardId = Number(params.id)
 
  const whiteboard: PublicWhiteboard = await getWhiteboard(whiteboardId)
  
  return (
    <main className="h-screen w-screen">
      <Whiteboard
        viewModeEnabled
        id={whiteboard?.id} 
        initialContent={whiteboard?.content as Content} 
      />
      <WhiteboardHeader 
        title={whiteboard.name} 
        description={whiteboard.description ?? ''} 
        creator={{
          name: whiteboard.createdBy.name,
          avatarUrl: whiteboard.createdBy.image
        }} 
      />
    </main>
  )
}


export default WhitebardViewPage