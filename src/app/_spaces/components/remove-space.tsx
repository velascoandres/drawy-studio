import React from 'react'

import { Button } from '@/app/_shared/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/_shared/components/ui/dialog'
import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { api } from '@/trpc/react'

interface Props {
	space: {id: number, name: string}
}


export const RemoveSpace = ({
  space
}: Props) => {

  const { closeModal } = useModalStore()
  const { toast } = useToast()
  const utils = api.useUtils()

  const { mutate: deleteSpace } = api.space.removeSpace.useMutation({
    onSuccess() {
      void utils.space.findUserSpaces.invalidate()
      void utils.space.findUserSpacesSummary.invalidate()

      toast({
        title: '🚨 Deleted',
        description: `Space: "${space.name}" was deleted`,
        duration: 5000,
      })
      closeModal()
    }
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-lg">Delete: {space.name}</DialogTitle>
      </DialogHeader>

      <p className="font-semibold text-pretty text-sm">
        Are you sure to <strong className="text-red-500">delete</strong> the space?
      </p>

      <DialogFooter>
        <Button
          variant="destructive"
          onClick={() => deleteSpace({ id: space.id })}
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