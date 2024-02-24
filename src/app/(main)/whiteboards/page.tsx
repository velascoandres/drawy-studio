'use client'

import React from 'react'

import { ManagementPageLayout } from '@/app/_shared/components/layout/management-layout'
import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { Pagination } from '@/app/_shared/components/ui/pagination'
import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { WhiteboardActions, WhiteboardCard } from '@/app/_whiteboards/components/whiteboard-card'
import { useWhiteboardList } from '@/app/_whiteboards/hooks/use-whiteboard-list'
import { IMAGES } from '@/constants/images'


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
    <ManagementPageLayout
      title="Your whiteboards"
      addLabel="Whiteboard"
      onAddClick={openCreateWhiteboard}
      onSearch={onSearchHandler}
      searchPlaceholder="Search whiteboards"
      searchValue={currentSearch}
    >
      <div className="flex flex-col items-center justify-center h-full px-4">
        <div className="flex flex-row flex-wrap gap-2 items-center justify-center h-full">
          {
            isLoading ? (
              <>
                <Skeleton className="bg-gray-600 w-[28rem] rounded-md h-72" />
                <Skeleton className="bg-gray-600 w-[28rem] rounded-md h-72" />
                <Skeleton className="bg-gray-600 w-[28rem] rounded-md h-72" />
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
        <div className="w-1/6 my-10 mb-8">
          <Pagination totalPages={totalPages} onPageChange={onPageChange} page={currentPage} />
        </div>
      </div>
    </ManagementPageLayout>
    
  )
}

export default WhiteboardsPage