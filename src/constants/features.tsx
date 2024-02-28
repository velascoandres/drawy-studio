import { Cloud, Group,LayoutDashboard } from 'lucide-react'

  
export const FEATURES = [
  {
    title: 'Save whiteboards',
    description: 'Save your whiteboards on the cloud',
    icon: <Cloud className="w-8 h-8" />
  },
  {
    title: 'Intuitive Dashboard',
    description: 'Save, organize, and manage your whiteboards efficiently.',
    icon: <LayoutDashboard className="w-8 h-8" />
  },
  {
    title: 'Workspaces',
    description: 'Group your whiteboards into workspaces',
    icon: <Group className="w-8 h-8" />
  },
]