import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchByIdDto } from '@/dtos/shared-dtos'
import type * as schema from '@/server/db/schema'
import { whiteboards } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof SearchByIdDto> & {userId: string}


const detachUserWhiteboardFromSpace = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, userId } = options

  const currentWhiteboard = await db.query.whiteboards.findFirst({
    where: (whiteboards, { eq }) => eq(whiteboards.id, id),
    columns: {
      id: true,
      createdById: true,
      spaceId: true,
    }
  })

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }

  if (!currentWhiteboard.spaceId){
    throw new NotFound('Whiteboard is not attached to a space')
  }

  const isOwner = currentWhiteboard?.createdById === userId

  if (!isOwner){
    throw new NotAuthorized('User not related to whiteboard')
  }

  await db.update(whiteboards).set({
    spaceId: null,
  }).where(eq(whiteboards.id, id))

  return {
    ok: true
  }
}


export default detachUserWhiteboardFromSpace