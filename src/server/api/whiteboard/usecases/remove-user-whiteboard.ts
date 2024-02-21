import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchByIdDto } from '@/dtos/shared-dtos'
import type * as schema from '@/server/db/schema'
import { whiteboard } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof SearchByIdDto> & {userId: string}


const removeUserWhiteboard = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, userId } = options

  const currentWhiteboard = await db.query.whiteboard.findFirst({
    where: (whiteboards, { eq }) => eq(whiteboards.id, id),
    columns: {
      id: true,
      createdById: true
    }
  })

  const isOwner = currentWhiteboard?.createdById === userId

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }

  if (!isOwner){
    throw new NotAuthorized('User is not related to whiteboard')
  }

  const { count }  = await db.delete(whiteboard).where(eq(whiteboard.id, id))

  return {
    count
  }
}


export default removeUserWhiteboard