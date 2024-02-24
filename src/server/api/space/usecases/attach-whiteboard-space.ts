import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type AttachWhiteboardSpaceDto } from '@/dtos/space-dtos'
import type * as schema from '@/server/db/schema'
import { spaces, whiteboards } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof AttachWhiteboardSpaceDto> & {userId: string}


const attachWhiteboardToSpace = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { spaceId, whiteboardId, userId } = options

  const currentSpace = await db.query.spaces.findFirst({
    where: (_, { eq }) => eq(spaces.id, spaceId),
    columns: {
      id: true,
      createdById: true
    }
  })

  if (!currentSpace){
    throw new NotFound('Space not found')
  }

  const isOwner = currentSpace?.createdById === userId

  if (!isOwner){
    throw new NotAuthorized('User not related to space')
  }

  const currentWhiteboard = await db.query.whiteboards.findFirst({
    where: (_, { eq }) => eq(whiteboards.id, whiteboardId),
    columns: {
      id: true,
      createdById: true
    }
  })

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }

  const isWhiteboardOwner = currentWhiteboard.createdById === userId

  if (!isWhiteboardOwner){
    throw new NotAuthorized('User not related to whiteboard')
  }


  await db.update(whiteboards).set({
    spaceId
  }).where(eq(whiteboards.id, whiteboardId))

  return { ok: true }
}


export default attachWhiteboardToSpace
