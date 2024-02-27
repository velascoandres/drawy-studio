import { and,eq, ilike, isNull,or, type SQL, sql } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchUserSpaceDto } from '@/dtos/space-dtos'
import type * as schema from '@/server/db/schema'
import { whiteboards } from '@/server/db/schema'

type Options = z.infer<typeof SearchUserSpaceDto> & {userId: string}

const DEFAULT_OFFSET_FACTOR = 10

const findUserWhiteboards = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { search, userId, spaceId,perPage = DEFAULT_OFFSET_FACTOR, page } = options

  let baseFilter = eq(whiteboards.createdById, userId)

  const extraConditions = []

  if (search){
    const searchExpression = `%${search}%`

    extraConditions.push(or(ilike(whiteboards.name, searchExpression), ilike(whiteboards.description, searchExpression)))
  }

  if (spaceId){
    extraConditions.push(eq(whiteboards.spaceId, spaceId))
  }

  if (spaceId === null){
    extraConditions.push(isNull(whiteboards.spaceId))
  }

  baseFilter = and(baseFilter, ...extraConditions) as SQL<typeof schema>

  const countResponseQuery = db.select({
    count: sql<number>`cast(count(${whiteboards.id}) as int)`,
  }).from(whiteboards).where(baseFilter)

  const queryResponse = db.query.whiteboards.findMany({
    where: baseFilter,
    limit: perPage,
    offset: perPage * (page - 1),
    orderBy: (whiteboards, { asc }) => [asc(whiteboards.createdAt)],
    with: {
      space: true
    }
  })

  const [[countResponse], data] = await Promise.all([countResponseQuery, queryResponse])

  const count = countResponse?.count ?? 0

  return {
    total: count,
    totalPages: Math.ceil(count / perPage),
    data
  }
  
}

export default findUserWhiteboards