'use client'

import React from 'react'

import { ManagementPageLayout } from '@/app/_shared/components/layout/management-layout'
import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { LoadingPage } from '@/app/_shared/components/ui/loading-page'
import { Pagination } from '@/app/_shared/components/ui/pagination'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { transformSpace } from '@/app/_spaces/utils/transform-space'
import { WhiteboardActions,WhiteboardCard } from '@/app/_whiteboards/components/whiteboard-card'
import { WhiteboardsSkeleton } from '@/app/_whiteboards/components/whiteboards-skeleton'
import { useWhiteboardList } from '@/app/_whiteboards/hooks/use-whiteboard-list'
import { IMAGES } from '@/constants/images'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

const SpacePage = ({ params }: {params: {id: string}}) => {
  const spaceId = Number(params.id)

  const { data: currentSpace } = api.space.findUserSpaceById.useQuery({
    id: spaceId
  })

  const {
    isLoading, 
    whiteboards,
    currentSearch, 
    totalPages, 
    currentPage, 
    onPageChange,
    onSearchHandler,
    openUpdateWhiteboard,
    openRemoveWhiteboard,
    openAttachSpace,
    openDetachSpace,
  } = useWhiteboardList({
    query: {
      spaceId,
    }
  })

  if (!currentSpace){
    return <LoadingPage />
  }

  return (
    <ManagementPageLayout
      title={currentSpace.name}
      addLabel="Attach Whiteboard"
      onAddClick={() => openAttachSpace(transformSpace(currentSpace))}
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

export default SpacePage
