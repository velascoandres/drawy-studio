import { type Space } from '@/app/_spaces/interfaces/space'

export interface Whiteboard {
    id: number
    name: string
    description?: string
    space?: Space
    isPublic: boolean
    content: unknown
    previewUrl?: string
}

export interface PublicWhiteboard {
    id: number
    name: string
    description?: string
    space?: Space
    isPublic: boolean
    content: unknown
    previewUrl?: string
    createdBy: {
        id: number
        name: string
        image: string
    }
}