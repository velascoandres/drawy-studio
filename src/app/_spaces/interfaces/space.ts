import { type z } from 'zod'

import { type StyleDto } from '@/dtos/space-dtos'

export interface Space {
    id: number
    name: string
    description?: string
    style: z.infer<typeof StyleDto>
}


export interface SpaceSummary extends Space {
    totalWhiteboards: number
}