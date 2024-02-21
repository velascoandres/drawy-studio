'use client'

import React from 'react'
import Link from 'next/link'
import { FilePenLine, MoreVertical,Plus, Presentation, Trash2 } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/app/_shared/components/ui/dropdown-menu'
import { Pagination } from '@/app/_shared/components/ui/pagination'
import { SearchBox } from '@/app/_shared/components/ui/search-box'
import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { cn } from '@/lib/utils'

import { useWhiteboardList } from '../hooks/use-whiteboard-list'

interface WhiteboardItem {
    id: number
    name: string
    description?: string | null
}

interface ListItemProps {
    item: WhiteboardItem
    isActive?: boolean
    onClick(item: WhiteboardItem): void
    children: React.ReactNode
}

interface WhiteboardActionsProps {
  onClickDelete(): void
  onClickUpdate(): void
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
    openUpdateWhiteboard,
    openRemoveWhiteboard,
    isLoading
  } = useWhiteboardList()

  const handleSelectItem = (item: WhiteboardItem) => {
    handleSelect(item)
  }

  return (
    <aside className="relative flex flex-col gap-2 py-2">
      <SearchBox value={currentSearch} placeholder="Search your whiteboards" onSearch={onSearchHandler} />
      <Button onClick={openCreateWhiteboard} className="transition ease-in block mx-auto w-full border-emerald-500 hover:bg-emerald-700/50 md:pl-2 text-emerald-500" variant="outline">
        <div className="inline-flex items-center gap-2 font-semibold justify-center">
          <Plus />
          <span className="hidden md:block font-bold">Whiteboard</span>
        </div>
      </Button>
      <ul className="list-none overflow-y-auto h-[calc(100dvh-17rem)]">
        {
          isLoading ? (
            <>
              <li><Skeleton className="bg-gray-600 w-full rounded-md h-12 mb-2" /></li>
              <li><Skeleton className="bg-gray-600 w-full rounded-md h-12 mb-2" /></li>
              <li><Skeleton className="bg-gray-600 w-full rounded-md h-12 mb-2" /></li>
              <li><Skeleton className="bg-gray-600 w-full rounded-md h-12" /></li>
            </>
          ) : (
            whiteboards.map((item) => (
              <li  key={item.id} >
                <WhiteboardItem 
                  isActive={currentWhiteboard?.id === item.id} 
                  item={item} 
                  onClick={handleSelectItem} 
                >
                  {
                    currentWhiteboard?.id === item.id && (
                      <WhiteboardActions 
                        onClickDelete={openRemoveWhiteboard} 
                        onClickUpdate={openUpdateWhiteboard}                    
                      />
                    )
                  }
                </WhiteboardItem>
              </li>
            ))
          )
        }
      </ul>
      <div className="absolute -bottom-12 w-full block mx-auto">

        <Pagination totalPages={totalPages} onPageChange={onPageChange} page={currentPage} />
      </div>
    </aside>
  )
}


const WhiteboardItem = ({ item, isActive, onClick, children }: ListItemProps) => {
  const { name, description = 'This whiteboard does not have any description' } = item
  
  return (
    <Link href={`/whiteboards/${item.id}`}>

      <article 
        className={cn('relative break-words overflow-hidden text-ellipsis transition ease-in my-2 p-2 cursor-pointer rounded-md border-2 border-transparent hover:text-indigo-700 hover:border-indigo-700', {
          'bg-indigo-700 border-gray-900 hover:text-white': isActive
        })} 
        onClick={() => onClick(item)}
      
      >
        <h4 className="font-semibold select-none flex items-center">
          <Presentation className={cn('hidden', {
            'mr-2 hidden md:block': isActive
          })}/> {name}
        </h4>
      
        {
          isActive && (
            <p className="text-white/50 break-words text-ellipsis">
              {description}
            </p>
          )
        }

        {children}
      </article>     
    </Link>
  )
}


const WhiteboardActions = ({
  onClickDelete,
  onClickUpdate
}: WhiteboardActionsProps) => {

  return (
    <div className="absolute top-1 right-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full px-2 bg-transparent border-none">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="base-bg border-gray-800">
          <DropdownMenuItem
            onClick={onClickUpdate}
            className="cursor-pointer flex justify-start gap-2"
          >
            <FilePenLine className="h-5 w-5" /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        
          <DropdownMenuItem
            onClick={onClickDelete}
            className="cursor-pointer flex justify-start gap-2 text-red-600"
          >
            <Trash2 className="h-5 w-5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}