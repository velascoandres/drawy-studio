import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type UpdateWhiteboardDto } from '@/dtos/whiteboard-dtos'
import type * as schema from '@/server/db/schema'
import { whiteboards } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof UpdateWhiteboardDto> & {userId: string}


const updateUserWhiteboard = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, name, description, isPublic, userId } = options

  const currentWhiteboard = await db.query.whiteboards.findFirst({
    where: (whiteboards, { eq }) => eq(whiteboards.id, id),
    columns: {
      id: true,
      createdById: true
    }
  })

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }

  const isOwner = currentWhiteboard?.createdById === userId

  if (!isOwner){
    throw new NotAuthorized('User not related to whiteboard')
  }

  const [updated] = await db.update(whiteboards).set({
    name,
    description,
    isPublic,
  }).where(eq(whiteboards.id, id)).returning()

  return {
    id: updated?.id,
    name: updated?.name,
    description: updated?.description,
    createdAt: updated?.createdAt,
    updatedAt: updated?.updatedAt,
  }
}


export default updateUserWhiteboard