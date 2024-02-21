import { z } from 'zod'

export const SearchByIdDto = z.object({ id: z.number() })


export const SearchDto = z.object({
  search: z.string(),
  perPage: z.number().optional().default(10),
  page: z.number().optional().default(1),
})