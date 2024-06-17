import { Button } from '@/app/_shared/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/_shared/components/ui/dialog'
import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { type Whiteboard } from '@/app/_whiteboards/interfaces/whiteboard'
import { api } from '@/trpc/react'

import { SpaceMiniCard } from './space-mini-card'

interface Props {
	whiteboard: Omit<Whiteboard, 'content'>
}


export const DetachWhiteboardSpace = ({
  whiteboard,
}: Props) => {
  const { closeModal } = useModalStore()
  const { toast } = useToast()
  const utils = api.useUtils()

  const { mutate: detach } = api.whiteboard.detachWhiteboardFromSpace.useMutation({
    onSuccess() {
      void utils.whiteboard.findUserWhiteboards.invalidate()

      toast({
        title: '🚨 Detached from space',
        description: `Whiteboard "${whiteboard.name}" was detached from the space: "${whiteboard?.space?.name}"`,
        duration: 5000,
      })
      closeModal()
    }
  })


  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-lg">Detach: {whiteboard.name}</DialogTitle>
      </DialogHeader>

      <p className="font-normal text-sm">
        Are you sure to <strong className="text-red-500">detach</strong> the whiteboard? 
      </p>
      
      <p className="text-pretty text-sm text-primary/65">
        The whiteboard will be detached from the space: 
      </p>

      <div className="p-3 border border-border rounded-sm flex flex-col gap-2"> 
        <div className="self-center">
          <SpaceMiniCard 
            title={whiteboard.space!.name} 
            background={whiteboard.space!.style.background.value} 
          />
        </div> 
      </div>


      <DialogFooter>
        <Button
          variant="destructive"
          onClick={() => detach({ id: whiteboard.id })}
        >
			    Yes
        </Button>
        <Button
          variant="ghost"
          onClick={closeModal}
        >
			    No
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}