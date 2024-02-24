import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchByIdDto } from '@/dtos/shared-dtos'
import type * as schema from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'

type Options = z.infer<typeof SearchByIdDto> & {userId: string}

const findUserSpaceById = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, userId } = options
  
  const currentSpace = await db.query.spaces.findFirst({
    where: (spaces, { eq }) => eq(spaces.id, id)
  })

  if (!currentSpace){
    throw new NotFound('Space not found')
  }

  const isOwner = currentSpace?.createdById === userId

  if (!isOwner){
    throw new NotAuthorized('User not related to space')
  }

  return currentSpace
}

export default findUserSpaceById