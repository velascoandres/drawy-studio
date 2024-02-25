import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { api } from '@/trpc/react'

export const useUpdateSpace = () => {
  const utils = api.useUtils()

  const { toast } = useToast()
  const { closeModal } = useModalStore()

  const {
    mutate: updateSpace,
    isLoading: isUpdating,
  } = api.space.updateUserSpace.useMutation({
    onSuccess: (response) => {
      void utils.space.findUserSpaces.invalidate()

      if (!response){
        return
      }
    
      toast({
        title: `✅ Space: ${response.name} updated`,
        duration: 2000,
      })
    
      closeModal()
    },
  })

  return {
    updateSpace,
    isUpdating,
  }
}