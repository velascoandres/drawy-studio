import { z } from 'zod'


export const CreateSpaceDto = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  style: z.object({
    background: z.object({
      type: z.enum(['color', 'gradient']),
      value: z.string().min(1)
    }),
    textColor: z.string().optional(),
  }).optional(),
})
  
export const UpdateSpaceDto = z.object({
  id: z.number(),
}).merge(CreateSpaceDto)


export const AttachWhiteboardSpaceDto = z.object({
  spaceId: z.number(),
  whiteboardId: z.number(),
})