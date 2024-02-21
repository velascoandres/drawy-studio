import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type CreateWhiteboardDto } from '@/dtos/whiteboard-dtos'
import { whiteboard } from '@/server/db/schema'

type Options = z.infer<typeof CreateWhiteboardDto> & {userId: string}


const createWhiteboard = async (db: PostgresJsDatabase, options: Options) => {
  const { name, description, userId } = options

  return db.insert(whiteboard).values({
    name,
    description,
    createdById: userId,
  }).returning()
}


export default createWhiteboard