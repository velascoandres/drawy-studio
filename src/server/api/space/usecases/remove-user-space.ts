import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchByIdDto } from '@/dtos/shared-dtos'
import type * as schema from '@/server/db/schema'
import { spaces, whiteboards } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof SearchByIdDto> & {userId: string}


const removeUserSpace= async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, userId } = options

  const currentSpace = await db.query.spaces.findFirst({
    where: (spaces, { eq }) => eq(spaces.id, id),
    columns: {
      id: true,
      createdById: true
    }
  })

  const isOwner = currentSpace?.createdById === userId

  if (!currentSpace){
    throw new NotFound('Space not found')
  }

  if (!isOwner){
    throw new NotAuthorized('User is not related to space')
  }

  await db.update(whiteboards).set({
    spaceId: null,
  }).where(eq(whiteboards.spaceId, id))

  const { count }  = await db.delete(spaces).where(eq(spaces.id, id))

  return {
    count
  }
}


export default removeUserSpace