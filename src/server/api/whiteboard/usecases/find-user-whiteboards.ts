import { eq, ilike, or, type SQL, sql } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchDto } from '@/dtos/shared-dtos'
import type * as schema from '@/server/db/schema'
import { whiteboard } from '@/server/db/schema'

type Options = z.infer<typeof SearchDto> & {userId: string}

const DEFAULT_OFFSET_FACTOR = 10

const findUserWhiteboards = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { search, userId, perPage = DEFAULT_OFFSET_FACTOR, page } = options

  const baseFilter = eq(whiteboard.createdById, userId)

  if (search){
    const searchExpression = `%${search}%`

    const orCondition = or(ilike(whiteboard.name, searchExpression), ilike(whiteboard.description, searchExpression))

    baseFilter.append(orCondition as SQL<typeof schema>)
  }

  const [countResponse] = await db.select({
    count: sql<number>`cast(count(${whiteboard.id}) as int)`,
  }).from(whiteboard).where(baseFilter)

  const data = await db.query.whiteboard.findMany({
    where: baseFilter,
    limit: perPage,
    offset: perPage * (page - 1)
  })

  const count = countResponse?.count ?? 0

  return {
    total: count,
    totalPages: Math.ceil(count / perPage),
    data
  }
  
}

export default findUserWhiteboards