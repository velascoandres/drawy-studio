import { Button } from '@/app/_shared/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/_shared/components/ui/dialog'
import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { type Whiteboard } from '@/app/_whiteboards/interfaces/whiteboard'
import { api } from '@/trpc/react'

interface Props {
	whiteboard: Whiteboard
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
        <DialogTitle className="text-xl">Detach: <strong className="text-primary" >{whiteboard.name}</strong></DialogTitle>
      </DialogHeader>

      <p className="px-2 font-semibold text-lg">
        Are you sure to <strong className="text-red-500">detach</strong> the whiteboard from the space?
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