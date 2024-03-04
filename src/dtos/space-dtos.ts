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
  name: z.string().min(1, 'A name is required').max(15, 'The name must be a maximum of 15 characters.'),
  description: z.string().max(180, 'The description must be a maximum of 180 characters.').optional(),
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
