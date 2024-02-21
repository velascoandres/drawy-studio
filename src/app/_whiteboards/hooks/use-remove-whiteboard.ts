'use client'

import { useRouter } from 'next/navigation'

import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { api } from '@/trpc/react'

export const useRemoveWhiteboard = () => {
  const router = useRouter()
  const { closeModal } = useModalStore()
  const utils = api.useUtils() 

  const { toast } = useToast()


  const { mutate, isSuccess, error, isLoading } = api.whiteboard.removeUserWhiteboard.useMutation({
    onSuccess: (created) => {
      if(!created){
        return
      }

      toast({
        title: '✅ Whiteboard was removed',
        duration: 2000,
      })
  
      void utils.whiteboard.findUserWhiteboards.invalidate()

      void router.push('/whiteboards')

      
      closeModal()
    }
  })


  return {
    error,
    remove: mutate,
    isRemoveSuccess: isSuccess,
    isLoading,
  }
}
