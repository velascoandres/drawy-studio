import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type UpdateWhiteboardContentDto } from '@/dtos/whiteboard-dtos'
import type * as schema from '@/server/db/schema'
import { whiteboard } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof UpdateWhiteboardContentDto> & {userId: string}


const updateWhiteboardContent = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, content, userId } = options
  
  const currentWhiteboard = await db.query.whiteboard.findFirst({
    where: eq(whiteboard.id, id) 
  })

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }

  const isOwner = currentWhiteboard?.createdById === userId

  if (!isOwner){
    throw new NotAuthorized('User not related to whiteboard')
  }

  return db.update(whiteboard).set({
    content
  }).where(eq(whiteboard.id, id)).returning()
}


export default updateWhiteboardContent