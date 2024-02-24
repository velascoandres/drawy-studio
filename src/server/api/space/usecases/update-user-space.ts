import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type UpdateSpaceDto } from '@/dtos/space-dtos'
import type * as schema from '@/server/db/schema'
import { spaces } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof UpdateSpaceDto> & {userId: string}


const updateUserSpace = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, name, description, style, userId } = options

  const currentSpace = await db.query.spaces.findFirst({
    where: (_, { eq }) => eq(spaces.id, id),
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

  const [updated] = await db.update(spaces).set({
    name,
    description,
    style
  }).where(eq(spaces.id, id)).returning()

  return updated
}


export default updateUserSpace