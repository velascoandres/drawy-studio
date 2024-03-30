import { and, eq,type SQL } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchWhitheboard } from '@/dtos/whiteboard-dtos'
import { compressContent } from '@/lib/compress-whiteboard'
import type * as schema from '@/server/db/schema'
import { whiteboards } from '@/server/db/schema'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof SearchWhitheboard>

const findWhiteboardContent = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, isPublic } = options

  let baseFilter = eq(whiteboards.id, id)

  if (isPublic !== undefined){
    baseFilter = and(baseFilter, eq(whiteboards.isPublic, isPublic)) as SQL<typeof schema>
  }
  
  const currentWhiteboard = await db.query.whiteboards.findFirst({
    where: baseFilter,
    with: {
      createdBy: {
        columns: {
          email: false,
          emailVerified: false,
        }
      },
    }
  })

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }

  const compressedRawContent = await compressContent(currentWhiteboard.content as Record<string, unknown>) 

  return {
    id: currentWhiteboard.id,
    name: currentWhiteboard.name,
    compressedRawContent,
    description: currentWhiteboard.description,
    previewUrl: currentWhiteboard.previewUrl,
    createdBy: currentWhiteboard.createdBy,
  }
}

export default findWhiteboardContent