import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type CreateSpaceDto } from '@/dtos/space-dtos'
import type * as schema from '@/server/db/schema'
import { spaces } from '@/server/db/schema'

type Options = z.infer<typeof CreateSpaceDto> & {userId: string}


const createSpace = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { name, description, userId, style } = options

  const [created] = await db.insert(spaces).values({
    name,
    description,
    style,
    createdById: userId,
  }).returning()

  return created
}


export default createSpace