import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type UpdateWhiteboardDto } from '@/dtos/whiteboard-dtos'
import type * as schema from '@/server/db/schema'
import { whiteboard } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof UpdateWhiteboardDto> & {userId: string}


const updateUserWhiteboard = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, name, description, userId } = options

  const currentWhiteboard = await db.query.whiteboard.findFirst({
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

  const [updated] = await db.update(whiteboard).set({
    name,
    description,
  }).where(eq(whiteboard.id, id)).returning()

  return updated
}


export default updateUserWhiteboard