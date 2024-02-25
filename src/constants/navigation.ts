import { Group, Presentation } from 'lucide-react'


export const NAVIGATION = {
  WHITEBOARDS: {
    path: '/whiteboards',
    name: 'Whiteboards',
    icon: Presentation
  },
  SPACES: {
    path: '/spaces',
    name: 'Spaces',
    icon: Group
  },
} as const


export const REDIRECT_PATH = NAVIGATION.WHITEBOARDS.path
