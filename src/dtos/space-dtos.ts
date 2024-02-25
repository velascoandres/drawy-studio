import { z } from 'zod'

import { SearchDto } from './shared-dtos'

export const StyleDto = z.object({
  background: z.object({
    type: z.enum(['color', 'gradient']),
    value: z.string().min(1)
  }),
  textColor: z.string().optional(),
})

export const CreateSpaceDto = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  style: StyleDto.optional(),
})
  
export const UpdateSpaceDto = z.object({
  id: z.number(),
}).merge(CreateSpaceDto)


export const AttachWhiteboardSpaceDto = z.object({
  spaceId: z.number(),
  whiteboardId: z.number(),
})


export const SearchUserSpaceDto = z.object({
  spaceId: z.number().optional().nullable(),
}).merge(SearchDto)
