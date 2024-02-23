'use client'

import React from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { Pagination } from '@/app/_shared/components/ui/pagination'
import { SearchBox } from '@/app/_shared/components/ui/search-box'
import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { WhiteboardActions, WhiteboardCard } from '@/app/_whiteboards/components/whiteboard-card'
import { useWhiteboardList } from '@/app/_whiteboards/hooks/use-whiteboard-list'
import { IMAGES } from '@/constants/images'
import { cn } from '@/lib/utils'


const WhiteboardsPage = () => {


  const {
    whiteboards,
    currentSearch, 
    totalPages, 
    currentPage, 
    onPageChange,
    onSearchHandler, 
    openCreateWhiteboard,
    openUpdateWhiteboard,
    openRemoveWhiteboard,
    isLoading
  } = useWhiteboardList()

  return (
    <main className="flex flex-col items-center h-full w-full px-4">
      <div className="relative flex flex-row items-center justify-center gap-2 py-2 w-full">
        <div className="basis-1/3">
          <SearchBox value={currentSearch} placeholder="Search your whiteboards" onSearch={onSearchHandler} />
        </div>
        <Button onClick={openCreateWhiteboard} className="transition ease-in border-emerald-500 hover:bg-emerald-700/50 md:pl-2 text-emerald-500" variant="outline">
          <div className="inline-flex items-center gap-2 font-semibold justify-center">
            <Plus />
            <span className="hidden md:block font-bold">Whiteboard</span>
          </div>
        </Button>
      </div>
      <div className={cn('grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 h-full', {
        'flex flex-col items-center justify-center h-full': !whiteboards.length
      })}>
        {
          isLoading ? (
            <>
              <Skeleton className="bg-gray-600 w-full rounded-md h-72" />
              <Skeleton className="bg-gray-600 w-full rounded-md h-72" />
              <Skeleton className="bg-gray-600 w-full rounded-md h-72" />
            </>
          ) : (
            whiteboards.length ? (
              whiteboards.map((item) => (
                <WhiteboardCard
                  key={item.id} 
                  item={item} 
                >
                  {
                    <WhiteboardActions 
                      onClickDelete={() => openRemoveWhiteboard(item)} 
                      onClickUpdate={() => openUpdateWhiteboard(item)}                    
                    />
                  }
                </WhiteboardCard>
              ))
            ) : (
              <EmptyState 
                title="Not found!" 
                description="Start adding whiteboards or change your search parameters" 
                image={IMAGES.START_STATE} 
              />
            )
          )
        }
      </div>
      <div className="absolute bottom-6 w-1/6">
        <Pagination totalPages={totalPages} onPageChange={onPageChange} page={currentPage} />
      </div>
    </main>
  )
}

export default WhiteboardsPage