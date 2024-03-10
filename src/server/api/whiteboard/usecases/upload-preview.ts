import { type UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { eq } from 'drizzle-orm'
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import type * as schema from '@/server/db/schema'
import { whiteboards } from '@/server/db/schema'
import { NotAuthorized } from '@/server/exceptions/not-authorized'
import { NotFound } from '@/server/exceptions/not-found'


type Options = { id: number, file: ArrayBuffer, userId: string }



cloudinary.config({
  secure: true,
})
  

const upload = async (id: number, file: ArrayBuffer) => {
 
  const cld_upload_stream = new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'whiteboards',
        public_id: `whiteboard_${id}`,
        resource_type: 'image',
      },
      function(error, result) {
        if (error){
          console.error(error)
          reject(error)
        }

        if (result){
          resolve(result)
        }

        reject('Error not found')

      }
    ).end(Buffer.from(file))
  })

  const result = await cld_upload_stream
    

  return {
    url: result.url
  }
}


const uploadPreview = async (db: PostgresJsDatabase<typeof schema>, options: Options) => {
  const { id, file, userId } = options

  const currentWhiteboard = await db.query.whiteboards.findFirst({
    where: (whiteboards, { eq }) => eq(whiteboards.id, id),
    columns: {
      id: true,
      createdById: true
    }
  })

  if (!currentWhiteboard){
    throw new NotFound('Whiteboard not found')
  }

  const isOwner = currentWhiteboard?.createdById === userId

  if (!isOwner){
    throw new NotAuthorized('User not related to whiteboard')
  }

  const { url } = await upload(id, file)

  await db.update(whiteboards).set({
    ...currentWhiteboard,
    previewUrl: url,
  }).where(eq(whiteboards.id, id))

  return { updated: true }
}

export default uploadPreview