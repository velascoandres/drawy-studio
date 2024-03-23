import { Cloud, Group,LayoutDashboard } from 'lucide-react'

  
export const FEATURES = [
  {
    title: 'Cloud based',
    description: 'Save your whiteboards remotely to the cloud',
    icon: <Cloud className="w-8 h-8 text-white" />
  },
  {
    title: 'Intuitive Dashboard',
    description: 'Save, organize, and manage your whiteboards efficiently.',
    icon: <LayoutDashboard className="w-8 h-8 text-white" />
  },
  {
    title: 'Workspaces',
    description: 'Group your whiteboards into workspaces',
    icon: <Group className="w-8 h-8 text-white" />
  },
]