import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { api } from '@/trpc/react'

export const useCreateSpace = () => {
  const utils = api.useUtils()

  const { toast } = useToast()
  const { closeModal } = useModalStore()

  const {
    mutate: createSpace,
    isLoading: isCreating,
  } = api.space.createSpace.useMutation({
    onSuccess: () => {
      void utils.space.findUserSpaces.invalidate()
      void utils.space.findUserSpacesSummary.invalidate()
    
      toast({
        title: '✅ Space created',
        duration: 2000,
      })
    
      closeModal()
    },
  })

  return {
    createSpace,
    isCreating,
  }
}