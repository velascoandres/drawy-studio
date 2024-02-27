import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type CreateWhiteboardDto } from '@/dtos/whiteboard-dtos'
import type * as schema from '@/server/db/schema'
import { spaces, whiteboards } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'

type Options = z.infer<typeof CreateWhiteboardDto> & {userId: string}


const createWhiteboard = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { name, description, userId, spaceId } = options


  const commonPayload = {
    name,
    description,
    createdById: userId,
  }

  if (!spaceId){
    const [created] = await db.insert(whiteboards).values({
      ...commonPayload,
      spaceId: null,
    }).returning()

    return created
  }

  const currentSpace  =  await db.query.spaces.findFirst({ where: eq(spaces.id, spaceId) })
    
  if (!currentSpace){
    throw new NotFound('Space not found')
  }

  const isSpaceOwner = currentSpace.createdById === userId

  if (!isSpaceOwner){
    throw new NotAuthorized('Space not related')
  }

  const [created] = await db.insert(whiteboards).values({
    ...commonPayload,
    spaceId,
  }).returning()

  return created
}


export default createWhiteboard