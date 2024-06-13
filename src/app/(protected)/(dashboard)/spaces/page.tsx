'use client'

import Link from 'next/link'

import { ManagementPageLayout } from '@/app/_shared/components/layout/management-layout'
import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { SpaceCard, SpaceCardActions } from '@/app/_spaces/components/space-card'
import { SpaceCardsSkeleton } from '@/app/_spaces/components/space-cards-skeleton'
import { useSpaceList } from '@/app/_spaces/hooks/use-space-list'
import { NAVIGATION } from '@/constants/navigation'
import { cn } from '@/lib/utils'

const SpacePage = () => {
  const {
    isLoading,
    spaces,
    openCreateSpaceModal,
    openDeleteSpaceModal,
    openUpdateSpaceModal,
    onSearchHandler
  } = useSpaceList()

  return (
    <ManagementPageLayout
      onSearch={onSearchHandler}
      title="Spaces"
      addLabel="Add new space"
      onAddClick={openCreateSpaceModal}
    >
      <div className={cn('flex-1 flex flex-col gap-8 items-center w-full h-full justify-between mb-24 md:mb-0', {
        'justify-center': !Boolean(spaces.length) && !isLoading
      })}>
        <ShowContent
          empty={!Boolean(spaces.length)}
          loading={isLoading}
          fallback={<SpaceCardsSkeleton />} 
          emptyState={
            <EmptyState
              title="No spaces were found"
              description="Please try adding new spaces or change your search parameters"
            />
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 w-full gap-2">
            {spaces.map((space) => (
              <Link key={`${space.id}-item`} href={`${NAVIGATION.SPACES.path}/${space.id}`}>
                <SpaceCard    
                  space={space}
                >
                  <SpaceCardActions
                    space={space} 
                    onClickUpdate={openUpdateSpaceModal} 
                    onClickRemove={openDeleteSpaceModal} 
                  />
                </SpaceCard>
              </Link>
            ))}
          </div>
        </ShowContent>
      </div>
    </ManagementPageLayout>
  )
}

export default SpacePage
