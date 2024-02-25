import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/_shared/components/ui/dialog'
import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { WhiteboardCard } from '@/app/_whiteboards/components/whiteboard-card'
import { WhiteboardPicker } from '@/app/_whiteboards/components/whiteboard-picker'
import { type Whiteboard } from '@/app/_whiteboards/interfaces/whiteboard'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'


interface Props {
    space: { id: number; name: string }
}

export const AttachWhiteboardSpace = ({
  space
}: Props) => {
  const utils = api.useUtils()

  const { closeModal } = useModalStore()

  const handleSuccess = () => {
    void utils.whiteboard.findUserWhiteboards.invalidate()
    
    toast({
      title: `✅ Whiteboard has been attached to: ${space?.name}`,
      duration: 2000,
    })

    closeModal()
  }

  const { mutate: attach, isLoading: isAttaching } = api.space.attachWhiteboardToSpace.useMutation({
    onSuccess: handleSuccess
  })

  const { toast } = useToast()
  const [whiteboardToAttach, setWhiteboardToAttach] = useState<Whiteboard>()

  const handleAttach =  () => {
    if (!whiteboardToAttach?.id){
      return
    }

    if (!space?.id){
      return
    }

    attach({
      whiteboardId: whiteboardToAttach.id,
      spaceId: space.id 
    })
  }


  return (
    <DialogContent preventCloseClickOutside preventScapeKeydown>
      <DialogHeader>
        <DialogTitle>Attach link to space: {space?.name} </DialogTitle>
      </DialogHeader>
      
      <WhiteboardPicker onWhiteboardSelect={setWhiteboardToAttach} />

      {
        whiteboardToAttach && (
          <div className="flex flex-col gap-2 items-start">
            <h3 className="text-sm text-gray-400 font-semibold">Link preview</h3>

            <WhiteboardCard whiteboard={whiteboardToAttach} />
          </div>
        )
      }

      <DialogFooter>
        <Button
          disabled={ isAttaching || !Boolean(whiteboardToAttach) }
          type="button"
          onClick={handleAttach}
        >
          <div className="flex justify-start items-center gap-2">
            <Loader2 
              className={cn('hidden',{
                'block animate-spin': isAttaching,
              })}
			    />
				      Attach
          </div>
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}