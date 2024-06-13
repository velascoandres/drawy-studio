import { and,eq, ilike, or, type SQL } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SimpleSearchDto } from '@/dtos/shared-dtos'
import type * as schema from '@/server/db/schema'
import { spaces } from '@/server/db/schema'

type Options = z.infer<typeof SimpleSearchDto> & {userId: string}

const findUserSpaces = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { search, userId } = options

  let baseFilter = eq(spaces.createdById, userId)

  if (search){
    const searchExpression = `%${search}%`

    const orCondition = or(ilike(spaces.name, searchExpression), ilike(spaces.description, searchExpression))

    baseFilter = and(baseFilter, orCondition) as SQL<typeof schema>
  }

  const data = await db.query.spaces.findMany({
    where: baseFilter,
    orderBy: (spaces, { desc }) => [desc(spaces.createdAt)],
  })

  return {
    data
  }  
}

export default findUserSpaces