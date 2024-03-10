import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { api } from '@/trpc/react'


export const useUpdateWhiteboard = () => {
  const { closeModal } = useModalStore()
  const utils = api.useUtils() 

  const { toast } = useToast()


  const { mutate, isSuccess, error, isLoading } = api.whiteboard.updateUserWhiteboardInfo.useMutation({
    onSuccess: (updated) => {
      if(!updated){
        return
      }

      toast({
        title: `✅ Whiteboard: ${updated.name} was updated`,
        duration: 2000,
      })
  
      void utils.whiteboard.findUserWhiteboards.invalidate()

      
      closeModal()
    },
  })

  return {
    error,
    update: mutate,
    isUpdateSuccess: isSuccess,
    isLoading,
  }
}
