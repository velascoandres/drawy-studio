import { Loader2 } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/_shared/components/ui/dialog'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { cn } from '@/lib/utils'

import { useRemoveWhiteboard } from '../hooks/use-remove-whiteboard'

interface Props {
    whiteboard: { id: number; name: string }
}


export const DeleteWhiteboard = ({
  whiteboard
}: Props) => {
  
  const { closeModal } = useModalStore()

  const { remove, isLoading } = useRemoveWhiteboard()
  
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl">Delete: <strong className="text-indigo-400" >{whiteboard.name}</strong></DialogTitle>
      </DialogHeader>
  
      <p className="px-2 font-semibold text-lg">
          Are you sure to <strong className="text-red-500">delete</strong> the whiteboard?
      </p>
  
      <DialogFooter>
        <Button
          disabled={isLoading}
          variant="destructive"
          onClick={() => remove({ id: whiteboard.id })}
        >
          <Loader2 
            className={cn('hidden',{
              'block animate-spin': isLoading,
            })}
          />
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