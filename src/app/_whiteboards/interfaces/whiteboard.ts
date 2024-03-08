import { type Space } from '@/app/_spaces/interfaces/space'

export interface Whiteboard {
    id: number
    name: string
    description?: string
    space?: Space
    isPublic: boolean
    content: unknown
}