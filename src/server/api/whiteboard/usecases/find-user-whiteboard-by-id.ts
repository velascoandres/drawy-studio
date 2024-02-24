import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchByIdDto } from '@/dtos/shared-dtos'
import type * as schema from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'

type Options = z.infer<typeof SearchByIdDto> & {userId: string}

const findUserWhiteboardById = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, userId } = options
  
  const currentWhiteboard = await db.query.whiteboards.findFirst({
    where: (whiteboards, { eq }) => eq(whiteboards.id, id)
  })

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }

  const isOwner = currentWhiteboard?.createdById === userId

  if (!isOwner){
    throw new NotAuthorized('User not related to whiteboard')
  }

  return currentWhiteboard
}

export default findUserWhiteboardById