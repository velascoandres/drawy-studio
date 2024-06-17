import { eq, sql } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SimpleSearchDto } from '@/dtos/shared-dtos'
import * as schema from '@/server/db/schema'

import findUserSpaces from './find-user-spaces'

type Options = z.infer<typeof SimpleSearchDto> & {userId: string}

export const findUserSpacesSummary = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { data: spaces } = await findUserSpaces(db, options)
 
  const spacesWithCountsQuery = spaces.map(async (space) => {
    const whiteboardsCount = await db.select({
      count: sql<number>`cast(count(${schema.whiteboards.id}) as int)`,
    }).from(schema.whiteboards).where(eq(schema.whiteboards.spaceId, space.id))

    return {
      ...space,
      totalWhiteboards: whiteboardsCount[0]?.count ?? 0,
    }
  })

  const spacesWithCounts = await Promise.all(spacesWithCountsQuery)
  
  return {
    data: spacesWithCounts
  }
}