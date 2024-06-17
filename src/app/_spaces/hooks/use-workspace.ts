import { useRouter } from 'next/navigation'

import { useToast } from '@/app/_shared/hooks/use-toast'
import { useWorkspaceStore } from '@/app/_shared/store/workspace-store'
import { NAVIGATION } from '@/constants/navigation'
import { DEFAULT_SPACE } from '@/constants/spaces'

import { type Space } from '../interfaces/space'


export const useWorkspace = () => {
  const store = useWorkspaceStore()
  const toaster = useToast()
  const router = useRouter()

  const changeWorkspace = (space: Space) => {
    store.setCurrentSpace(space)

    toaster.toast({
      title: `Changed workspace to: ${space.name}`
    })

    if (!space.id){
      return router.push(`${NAVIGATION.SPACES.path}/${DEFAULT_SPACE}`)
    }
  
    router.push(`${NAVIGATION.SPACES.path}/${space.id}`)  
  }

  const removeCurrentSpace = () => {
    store.removeCurrentSpace()

    toaster.toast({
      title: 'Use default workspace'
    })

    router.push(`${NAVIGATION.SPACES.path}/${DEFAULT_SPACE}`)
  }

  return {
    currentSpace: store.currentSpace,
    changeWorkspace,
    removeCurrentSpace,
  }
}
