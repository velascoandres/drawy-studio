import { Group } from 'lucide-react'


export const NAVIGATION = {
  SPACES: {
    path: '/spaces',
    name: 'Your spaces',
    icon: Group
  },
} as const


export const REDIRECT_PATH = NAVIGATION.SPACES.path
