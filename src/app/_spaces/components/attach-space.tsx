import React, { useState } from 'react'
import { Loader2, Search } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/_shared/components/ui/dialog'
import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { Input } from '@/app/_shared/components/ui/input'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { useDebounceCallback } from '@/app/_shared/hooks/use-debounce-callback'
import { useToast } from '@/app/_shared/hooks/use-toast'
import { useModalStore } from '@/app/_shared/store/modal-store'
import { WhiteboardPreview } from '@/app/_whiteboards/components/whiteboard-preview'
import { useFindUserWhiteboards } from '@/app/_whiteboards/hooks/use-find-user-whiteboards'
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

  const [search, setSearch] = useState('')
  const debounce = useDebounceCallback()

  const { whiteboards, isLoading,  } = useFindUserWhiteboards({
    page: 1,
    query: {
      spaceId: null,
      search
    }
  })  

  const { mutate: attach, isLoading: isAttaching } = api.space.attachWhiteboardToSpace.useMutation({
    onSuccess: () => {
      void utils.whiteboard.findUserWhiteboards.invalidate()
    
      toast({
        title: `✅ Whiteboard has been attached to: ${space?.name}`,
        duration: 2000,
      })

      closeModal()
    }
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

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    
    debounce(() => {
      setSearch(evt.target.value)
      handleSelect(undefined)
    })
  }


  const handleSelect = (whiteboard: Whiteboard | undefined) => {
    setWhiteboardToAttach(whiteboard)
  }


  return (
    <DialogContent preventCloseClickOutside preventScapeKeydown className="h-screen xl:h-auto md:max-w-4xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Attach whiteboard to space: {space?.name} </DialogTitle>
      </DialogHeader>
      
      <div className="relative w-full mx-auto">
        <Search className="absolute z-10 left-2 top-2" />
        <Input className="w-full pl-10" placeholder="Search whiteboards" onChange={handleInputChange} /> 
      </div>

      <ShowContent
        emptyState={<EmptyState title="No whiteboards were found" description="Possibly there are no whiteboards available or try changing your search" />}
        empty={!Boolean(whiteboards.length)}
        loading={isLoading}
        fallback={<Skeleton className="h-[300px] w-full" />}
      >
        <div className="inline-flex gap-4 w-full">
          <div className="basis-1/2 flex flex-col items-start gap-2">
            <h3 className="ml-2 mt-2 font-semibold text-sm self-start text-gray-400">Available whiteboards: </h3>
            <ul className="list-none w-full p-2 overflow-y-auto max-h-[300px] border border-gray-800 rounded-md bg-gradient-to-br from-gray-900 to-indigo-950">
              {whiteboards.map((whiteboard) => 
                <li
                  className={cn('my-1 flex flex-row justify-start items-center gap-2 transition ease-in cursor-pointer select-none px-3 py-2 hover:text-indigo-400 border border-transparent hover:border-gray-700 rounded-md',{
                    'bg-background text-indigo-400 border-gray-700': whiteboardToAttach?.id === whiteboard.id
                  })} 
                  onClick={() => handleSelect(whiteboard)} 
                  key={whiteboard.id}
                >
               
                  <span>{whiteboard.name}</span>
                </li>
              )}
            </ul>
          </div>
  
          <div className="basis-1/2 aspect-square p-2 border border-dashed rounded-md">
            {
              whiteboardToAttach && (
                <WhiteboardPreview className="rounded-md" name={whiteboardToAttach.name} content={whiteboardToAttach.content} />
              )
            }
          </div>   
        </div>
             
              
      </ShowContent>


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