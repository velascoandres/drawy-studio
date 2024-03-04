import { and,eq, ilike, or, type SQL, sql } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchDto } from '@/dtos/shared-dtos'
import type * as schema from '@/server/db/schema'
import { spaces } from '@/server/db/schema'

type Options = z.infer<typeof SearchDto> & {userId: string}

const DEFAULT_OFFSET_FACTOR = 10

const findUserSpaces = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { search, userId, perPage = DEFAULT_OFFSET_FACTOR, page } = options

  let baseFilter = eq(spaces.createdById, userId)

  if (search){
    const searchExpression = `%${search}%`

    const orCondition = or(ilike(spaces.name, searchExpression), ilike(spaces.description, searchExpression))

    baseFilter = and(baseFilter, orCondition) as SQL<typeof schema>
  }

  const [countResponse] = await db.select({
    count: sql<number>`cast(count(${spaces.id}) as int)`,
  }).from(spaces).where(baseFilter)

  const data = await db.query.spaces.findMany({
    where: baseFilter,
    limit: perPage,
    orderBy: (spaces, { desc }) => [desc(spaces.createdAt)],
    offset: perPage * (page - 1)
  })

  const count = countResponse?.count ?? 0

  return {
    total: count,
    totalPages: Math.ceil(count / perPage),
    data
  }
  
}

export default findUserSpaces