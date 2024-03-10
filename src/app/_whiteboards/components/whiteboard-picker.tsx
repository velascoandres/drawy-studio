import React, { useState } from 'react'
import { Search } from 'lucide-react'

import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { Input } from '@/app/_shared/components/ui/input'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { useDebounceCallback } from '@/app/_shared/hooks/use-debounce-callback'
import { cn } from '@/lib/utils'

import { useFindUserWhiteboards } from '../hooks/use-find-user-whiteboards'
import { type Whiteboard } from '../interfaces/whiteboard'

import { WhiteboardCard } from './whiteboard-card'

interface Props {
 attachedSpace?: boolean
 selectedWhiteboard?: Whiteboard

 onWhiteboardSelect: (whiteboard: Whiteboard | undefined) => void
}


export const WhiteboardPicker = ({
  onWhiteboardSelect
}:Props) => {
  const [selectedWhiteboard, setSelectedWhiteboard] = useState<Omit<Whiteboard, 'content'>>()
  const [search, setSearch] = useState('')
  const debounce = useDebounceCallback()

  const { whiteboards, isLoading,  } = useFindUserWhiteboards({
    page: 1,
    query: {
      spaceId: null,
      search
    }
  })

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    
    debounce(() => {
      setSearch(evt.target.value)
      handleSelect(undefined)
    })
  }


  const handleSelect = (whiteboard: Omit<Whiteboard, 'content'> | undefined) => {
    setSelectedWhiteboard(whiteboard)
    onWhiteboardSelect(whiteboard)
  }
      

  return (
    <section className="pt-2 flex flex-col items-center gap-2 justify-start w-full">
      <header className="relative w-full">
        <Search className="absolute z-10 left-2 top-2" />
        <Input className="w-full pl-10" placeholder="Search whiteboards" onChange={handleInputChange} /> 
      </header>
 

      <ShowContent
        emptyState={<EmptyState title="No whiteboards were found" description="Possibly there are no whiteboards available or try changing your search" />}
        empty={!Boolean(whiteboards.length)}
        loading={isLoading}
        fallback={<Skeleton className="h-[300px] w-full" />}
      >
        <div className="inline-flex gap-4 w-full">
          <div className="basis-1/2 flex flex-col items-start gap-2">
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
          </div>
  
          <div className="basis-1/2 aspect-square p-2 border border-dashed rounded-md">
            {
              selectedWhiteboard && (
                <WhiteboardCard whiteboard={selectedWhiteboard} />
              )
            }
          </div>   
        </div>      
      </ShowContent>
    </section>
  )
}