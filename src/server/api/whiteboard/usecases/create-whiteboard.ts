import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type CreateWhiteboardDto } from '@/dtos/whiteboard-dtos'
import type * as schema from '@/server/db/schema'
import { whiteboard } from '@/server/db/schema'

type Options = z.infer<typeof CreateWhiteboardDto> & {userId: string}


const createWhiteboard = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { name, description, userId } = options

  const [created] = await db.insert(whiteboard).values({
    name,
    description,
    createdById: userId,
  }).returning()

  return created
}


export default createWhiteboard