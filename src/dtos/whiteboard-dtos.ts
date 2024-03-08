import { z } from 'zod'

export const CreateWhiteboardDto = z.object({
  name: z.string().min(1, 'A name is required').max(30, 'The name must be a maximum of 30 characters.'),
  description: z.string().max(180, 'The description must be a maximum of 180 characters.').optional(),
  spaceId: z.number().nullish(),
  isPublic: z.boolean().default(false),
})

export const UpdateWhiteboardDto = z.object({
  id: z.number(),
}).merge(CreateWhiteboardDto)

export const UpdateWhiteboardContentDto = z.object({
  id: z.number(),
  content: z.unknown(),
})
