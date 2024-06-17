'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Merge } from 'lucide-react'

import { ManagementPageLayout } from '@/app/_shared/components/layout/management-layout'
import { Button } from '@/app/_shared/components/ui/button'
import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { Pagination } from '@/app/_shared/components/ui/pagination'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { type Space } from '@/app/_spaces/interfaces/space'
import {
  WhiteboardActions,
  WhiteboardCard,
} from '@/app/_whiteboards/components/whiteboard-card'
import { WhiteboardsSkeleton } from '@/app/_whiteboards/components/whiteboards-skeleton'
import { useWhiteboardList } from '@/app/_whiteboards/hooks/use-whiteboard-list'
import { IMAGES } from '@/constants/images'
import { DEFAULT_SPACE } from '@/constants/spaces'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

const SpacePage = ({ params }: { params: { id: string } }) => {
  const spaceId = params.id !== DEFAULT_SPACE ? Number(params.id) : null

  const { data: currentSpace } = api.space.findUserSpaceById.useQuery(
    {
      id: spaceId ?? 0,
    },
    {
      enabled: Boolean(spaceId),
    },
  )

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
    },
  })

  useEffect(() => {
    if (!currentSpace) {
      return
    }

    document.title = `${currentSpace.name} | Drawy`
  }, [currentSpace])

  return (
    <ManagementPageLayout
      title={currentSpace?.name ?? 'Default space'}
      addLabel="New Whiteboard"
      onAddClick={() => openCreateWhiteboard(currentSpace?.id)}
      onSearch={onSearchHandler}
      searchPlaceholder="Search whiteboards"
      searchValue={currentSearch}
      extraActions={[
        spaceId ? (
          <Button
            key="attach-action"
            variant="ghost"
            onClick={() => openAttachSpace(currentSpace as Space)}
            className="flex-row items-center justify-center gap-2"
          >
            <Merge className="w-auto md:h-auto" />{' '}
            <span className="hidden md:block"> Attach Whiteboard </span>
          </Button>
        ) : null,
      ]}
    >
      <div
        className={cn(
          'mb-24 flex h-full w-full flex-1 flex-col items-center justify-between gap-8 md:mb-0',
          {
            'justify-center': !Boolean(whiteboards.length) && !isLoading,
          },
        )}
      >
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
              <Link
                key={whiteboard.id}
                href={`/whiteboard/${whiteboard.id}`}
                className="w-full cursor-pointer transition ease-in"
              >
                <WhiteboardCard whiteboard={whiteboard}>
                  <WhiteboardActions
                    whiteboard={whiteboard}
                    onClickDelete={() => openRemoveWhiteboard(whiteboard)}
                    onClickUpdate={() => openUpdateWhiteboard(whiteboard)}
                    onClickDetach={() => openDetachSpace(whiteboard)}
                  />
                </WhiteboardCard>
              </Link>
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
