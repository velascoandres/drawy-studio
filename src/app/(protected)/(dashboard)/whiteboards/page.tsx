'use client'

import React from 'react'

import { ManagementPageLayout } from '@/app/_shared/components/layout/management-layout'
import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { Pagination } from '@/app/_shared/components/ui/pagination'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { WhiteboardActions, WhiteboardCard } from '@/app/_whiteboards/components/whiteboard-card'
import { WhiteboardsSkeleton } from '@/app/_whiteboards/components/whiteboards-skeleton'
import { useWhiteboardList } from '@/app/_whiteboards/hooks/use-whiteboard-list'
import { IMAGES } from '@/constants/images'
import { cn } from '@/lib/utils'


const WhiteboardsPage = () => {
  const {
    isLoading, 
    whiteboards,
    currentSearch, 
    totalPages, 
    currentPage, 
    onPageChange,
    onSearchHandler,
    openCreateWhiteboard,
    openUpdateWhiteboard,
    openRemoveWhiteboard,
    openDetachSpace,
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
      <div className={cn('flex-1 flex flex-col gap-8 items-center w-full h-full', {
        'justify-center': !Boolean(whiteboards.length)
      })}>
        <ShowContent
          empty={!Boolean(whiteboards.length)}
          loading={isLoading}
          fallback={<WhiteboardsSkeleton />} 
          emptyState={
            <EmptyState 
              title="Not found!" 
              description="Start adding whiteboards or change your search parameters" 
              image={IMAGES.START_STATE} 
            />
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 w-full">
            {whiteboards.map((whiteboard) => (
              <WhiteboardCard
                key={whiteboard.id} 
                whiteboard={whiteboard} 
              >
                <WhiteboardActions
                  whiteboard={whiteboard} 
                  onClickDelete={() => openRemoveWhiteboard(whiteboard)} 
                  onClickUpdate={() => openUpdateWhiteboard(whiteboard)}
                  onClickDetach={() => openDetachSpace(whiteboard)}                    
                />
              </WhiteboardCard>
            ))}
          </div>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </ShowContent>
      </div>
    </ManagementPageLayout>
  )
}

export default WhiteboardsPage