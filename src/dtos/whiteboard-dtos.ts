import { z } from 'zod'

export const CreateWhiteboardDto = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  spaceId: z.number().nullable()
})

export const UpdateWhiteboardDto = z.object({
  id: z.number(),
}).merge(CreateWhiteboardDto)

export const UpdateWhiteboardContentDto = z.object({
  id: z.number(),
  content: z.unknown(),
})