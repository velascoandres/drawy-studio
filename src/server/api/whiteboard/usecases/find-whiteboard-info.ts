import { and, eq,type SQL } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchWhitheboard } from '@/dtos/whiteboard-dtos'
import type * as schema from '@/server/db/schema'
import { whiteboards } from '@/server/db/schema'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof SearchWhitheboard>

const findWhiteboardInfo = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, isPublic } = options

  let baseFilter = eq(whiteboards.id, id)

  if (isPublic !== undefined){
    baseFilter = and(baseFilter, eq(whiteboards.isPublic, isPublic)) as SQL<typeof schema>
  }
  
  const currentWhiteboard = await db.query.whiteboards.findFirst({
    where: baseFilter,
    columns: {
      content: false,
    }
  })

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }


  return currentWhiteboard
}

export default findWhiteboardInfo