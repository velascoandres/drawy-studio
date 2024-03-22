import { Button } from '@/app/_shared/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/_shared/components/ui/dialog'
import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { type Whiteboard } from '@/app/_whiteboards/interfaces/whiteboard'
import { api } from '@/trpc/react'

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
        <DialogTitle className="text-lg">Detach: <strong className="text-primary" >{whiteboard.name}</strong></DialogTitle>
      </DialogHeader>

      <p className="px-2 font-semibold">
        Are you sure to <strong className="text-red-500">detach</strong> the whiteboard? 
      </p>
      
      <p className="p-3 border rounded-sm text-sm bg-secondary">
      the whiteboard will be detached from the space: <span className="text-indigo-400">&quot;{whiteboard.space?.name}&quot;</span>
      </p>

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