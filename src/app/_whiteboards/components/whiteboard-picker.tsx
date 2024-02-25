import React, { useState } from 'react'
import { Search } from 'lucide-react'

import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { Input } from '@/app/_shared/components/ui/input'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { useDebounceCallback } from '@/app/_shared/hooks/use-debounce-callback'
import { cn } from '@/lib/utils'

import { useWhiteboardList } from '../hooks/use-whiteboard-list'
import { type Whiteboard } from '../interfaces/whiteboard'

interface Props {
 attachedSpace?: boolean
 selectedWhiteboard?: Whiteboard

 onWhiteboardSelect: (whiteboard: Whiteboard | undefined) => void
}


export const WhiteboardPicker = ({
  selectedWhiteboard: initialWhiteboard,
  onWhiteboardSelect
}:Props) => {
  const [selectedWhiteboard, setSelectedWhiteboard] = useState(initialWhiteboard)
  const [search, setSearch] = useState('')
  const debounce = useDebounceCallback()

  const { whiteboards, isLoading } = useWhiteboardList({ query: { spaceId: null } })

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setSearch(evt.target.value) 
      handleSelect(undefined)
    })
  }


  const handleSelect = (whiteboard: Whiteboard | undefined) => {
    setSelectedWhiteboard(whiteboard)
    onWhiteboardSelect(whiteboard)
  }
      

  return (
    <div className="flex flex-col items-center gap-2 justify-start w-full">
      <div className="relative w-full">
        <Search className="absolute z-10 left-2 top-2" />
        <Input value={search} className="w-full pl-10" placeholder="Search whiteboards" onChange={handleInputChange} /> 
      </div>
 

      <ShowContent
        emptyState={<EmptyState title="No whiteboards were found" description="Possibly there are no whiteboards available or try changing your search" />}
        empty={!Boolean(whiteboards.length)}
        loading={isLoading}
        fallback={<Skeleton className="h-[300px] w-full" />}
      >
        <h3 className="ml-2 mt-2 font-semibold text-sm self-start text-gray-400">Available whiteboards: </h3>
        <ul className="list-none w-full p-2 overflow-y-auto max-h-[300px] border border-gray-800 rounded-md">
          {whiteboards.map((whiteboard) => 
            <li
              className={cn('my-1 flex flex-row justify-start items-center gap-2 transition ease-in cursor-pointer select-none px-3 py-2 hover:bg-neutral-700 border border-gray-800 rounded-md',{
                'bg-neutral-800': selectedWhiteboard?.id === whiteboard.id
              })} 
              onClick={() => handleSelect(whiteboard)} 
              key={whiteboard.id}
            >
               
              <span>{whiteboard.name}</span>
            </li>
          )}
        </ul>
      </ShowContent>
    </div>
  )
}