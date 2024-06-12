'use client'

import React, { useEffect } from 'react'
import { Merge } from 'lucide-react'

import { ManagementPageLayout } from '@/app/_shared/components/layout/management-layout'
import { Button } from '@/app/_shared/components/ui/button'
import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { Pagination } from '@/app/_shared/components/ui/pagination'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { transformSpace } from '@/app/_spaces/utils/transform-space'
import { WhiteboardActions,WhiteboardCard } from '@/app/_whiteboards/components/whiteboard-card'
import { WhiteboardsSkeleton } from '@/app/_whiteboards/components/whiteboards-skeleton'
import { useWhiteboardList } from '@/app/_whiteboards/hooks/use-whiteboard-list'
import { IMAGES } from '@/constants/images'
import { DEFAULT_SPACE } from '@/constants/spaces'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

const SpacePage = ({ params }: {params: {id: string}}) => {
  const spaceId = params.id !== DEFAULT_SPACE ? Number(params.id) : null

  const { data: currentSpace } = api.space.findUserSpaceById.useQuery({
    id: spaceId
  }, {
    enabled: Boolean(spaceId),
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
    openCreateWhiteboard,
    openAttachSpace,
    openDetachSpace,
  } = useWhiteboardList({
    query: {
      spaceId,
    }
  })

  useEffect(() => {
    if (!currentSpace){
      return
    }

    document.title = `${currentSpace.name} | Drawy`
  }, [currentSpace])

  return (
    <ManagementPageLayout
      title={currentSpace?.name ?? 'Not asigned'}
      addLabel="New Whiteboard"
      onAddClick={() => openCreateWhiteboard(currentSpace?.id)}
      onSearch={onSearchHandler}
      searchPlaceholder="Search whiteboards"
      searchValue={currentSearch}
      extraActions={[
        spaceId ? (
          <Button key="attach-action" variant="ghost" onClick={() => openAttachSpace(transformSpace(currentSpace))} className="flex-row gap-2 justify-center items-center">
            <Merge className="w-auto md:h-auto" /> <span className="hidden md:block"> Attach Whiteboard </span>
          </Button>  
        ) : null
      ]}
    >
      <div className={cn('flex-1 flex flex-col gap-8 items-center w-full h-full justify-between mb-24 md:mb-0', {
        'justify-center': !Boolean(whiteboards.length) && !isLoading
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
          <div className="grid-view">
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
