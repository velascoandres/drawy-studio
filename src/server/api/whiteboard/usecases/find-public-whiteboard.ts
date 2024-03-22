import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { type z } from 'zod'

import { type SearchByIdDto } from '@/dtos/shared-dtos'
import type * as schema from '@/server/db/schema'
import { NotFound } from '@/server/exceptions/not-found'


type Options = z.infer<typeof SearchByIdDto> & {omitContent?: boolean}

const findPublicWhiteboardById = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, omitContent = false } = options
  
  const currentWhiteboard = await db.query.whiteboards.findFirst({
    where: (whiteboards, { eq, and }) => and(eq(whiteboards.id, id), eq(whiteboards.isPublic, true)),
    columns: {
      id: true,
      name: true,
      description: true,
      content: !omitContent ? true : false,
      createdAt: true,
      updatedAt: true,
      previewUrl: true,
    },
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

  return currentWhiteboard
}

export default findPublicWhiteboardById