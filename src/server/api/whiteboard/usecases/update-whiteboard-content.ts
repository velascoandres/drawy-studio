import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type UpdateWhiteboardContentDto } from '@/dtos/whiteboard-dtos'
import { b64toStream, decompressStream } from '@/lib/compress'
import type * as schema from '@/server/db/schema'
import { whiteboards } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof UpdateWhiteboardContentDto> & {userId: string}


const updateWhiteboardContent = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, compressedRawContent, userId } = options
  
  const currentWhiteboard = await db.query.whiteboards.findFirst({
    where: eq(whiteboards.id, id) 
  })

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }

  const isOwner = currentWhiteboard?.createdById === userId

  if (!isOwner){
    throw new NotAuthorized('User not related to whiteboard')
  }

  const contentResponse = decompressStream(b64toStream(compressedRawContent))
  const content = await contentResponse.json() as Record<string, unknown>

  return db.update(whiteboards).set({
    content
  }).where(eq(whiteboards.id, id))
}


export default updateWhiteboardContent