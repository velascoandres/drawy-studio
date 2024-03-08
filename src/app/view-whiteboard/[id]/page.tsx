'use server'

import React from 'react'
import { redirect } from 'next/navigation'

import { type Content, Whiteboard } from '@/app/_whiteboards/components/whiteboard'
import findPublicWhiteboardById from '@/server/api/whiteboard/usecases/find-public-whiteboard'
import { db } from '@/server/db'


const getWhiteboard = async (id: number) => {
  const whiteboard = await findPublicWhiteboardById(db, { id })

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
      <Whiteboard
        viewModeEnabled
        id={whiteboard?.id} 
        initialContent={whiteboard?.content as Content} 
      />
      <header className="z-[2] bg-background/70 backdrop-blur-sm fixed inline-flex py-2 justify-center items-center top-4 right-[5%] left-[5%] md:right-[15%] md:left-[15%] lg:right-[30%] lg:left-[30%] rounded-full px-2 gap-2 border border-border">
        <h1 className="basis-2/3 text-center font-bold max-w-sm text-2xl text-ellipsis select-none">{whiteboard.name}</h1>
      </header>
    </main>
  )
}

export default WhitebardViewPage