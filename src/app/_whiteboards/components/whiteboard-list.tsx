'use client'

import React from 'react'
import Link from 'next/link'
import { Plus, Presentation } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { Pagination } from '@/app/_shared/components/ui/pagination'
import { SearchBox } from '@/app/_shared/components/ui/search-box'
import { cn } from '@/lib/utils'

import { useWhiteboardList } from '../hooks/useWhiteboardList'

interface Item {
    id: string
    name: string
    description?: string
}

interface ListItemProps {
    item: Item
    isActive?: boolean
    onClick(item: Item): void
}


export const WhiteboardList = () => {
  const {
    whiteboards,
    currentSearch, 
    totalPages, 
    handleSelect, 
    currentWhiteboard, 
    currentPage, 
    onPageChange,
    onSearchHandler, 
    openCreateWhiteboard,
  } = useWhiteboardList()

  const handleSelectItem = (item: Item) => {
    handleSelect(item)
  }

  return (
    <aside className="relative flex flex-col gap-2 py-2">
      <SearchBox value={currentSearch} placeholder="Search your whiteboards" onSearch={onSearchHandler} />
      <Button onClick={openCreateWhiteboard} className="transition ease-in block mx-auto w-full border-emerald-500 hover:bg-emerald-700/50 md:pl-2 text-emerald-500" variant="outline">
        <div className="inline-flex items-center gap-2 font-semibold">
          <Plus />
          <span className="hidden md:block">New whiteboard</span>
        </div>
      </Button>
      <ul className="list-none my-2 overflow-y-auto h-[calc(100dvh-18rem)]">
        {
          whiteboards.map((item) => (
            <li  key={item.id} >
              <WhiteboardItem isActive={currentWhiteboard?.id === item.id} item={item} onClick={handleSelectItem} />
            </li>
          ))
        }
      </ul>
      <div className="absolute -bottom-12 w-full block mx-auto">

        <Pagination totalPages={totalPages} onPageChange={onPageChange} page={currentPage} />
      </div>
    </aside>
  )
}


const WhiteboardItem = ({ item, isActive, onClick }: ListItemProps) => {
  const { name, description = 'This whiteboard does not have any description' } = item
  
  return (
    <Link href={`/whiteboards/${item.id}`}>

      <article 
        className={cn('break-words overflow-hidden text-ellipsis transition ease-in my-2 p-2 cursor-pointer rounded-md border-2 border-transparent hover:text-indigo-700', {
          'bg-indigo-700 border-gray-900 hover:text-white': isActive
        })} 
        onClick={() => onClick(item)}
      
      >
        <h4 className="font-semibold select-none flex items-center">
          <Presentation className="mr-2 hidden md:block"/> {name}
        </h4>
      
        {
          isActive && (
            <p className="text-white/50 break-words text-ellipsis">
              {description}
            </p>
          )
        }
      </article>     
    </Link>
  )
}

