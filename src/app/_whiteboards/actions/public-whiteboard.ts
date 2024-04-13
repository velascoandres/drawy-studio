import { redirect } from 'next/navigation'

import findWhiteboardContent from '@/server/api/whiteboard/usecases/find-whiteboard-content'
import { db } from '@/server/db'

export const getPublicWhiteboard = async (id: number) => {
  'use server'
  const whiteboard = await findWhiteboardContent(db, { id, isPublic: true })
  
  if (!whiteboard){
    redirect('/not-found')
  }
  
  return whiteboard
}
  