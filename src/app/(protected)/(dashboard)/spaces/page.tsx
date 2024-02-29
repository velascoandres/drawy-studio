'use client'

import Link from 'next/link'

import { ManagementPageLayout } from '@/app/_shared/components/layout/management-layout'
import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { Pagination } from '@/app/_shared/components/ui/pagination'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { SpaceCard, SpaceCardActions } from '@/app/_spaces/components/space-card'
import { SpaceCardsSkeleton } from '@/app/_spaces/components/space-cards-skeleton'
import { useSpaceList } from '@/app/_spaces/hooks/use-space-list'
import { NAVIGATION } from '@/constants/navigation'
import { cn } from '@/lib/utils'


const SpacePage = () => {
  const {
    page,
    isLoading,
    spaces,
    totalPages,
    openCreateSpaceModal,
    openDeleteSpaceModal,
    openUpdateSpaceModal,
    onPageChange,
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
              <SpaceCard 
                key={`${space.id}-item`} 
                space={space}
                renderTitle={() => (
                  <Link href={`${NAVIGATION.SPACES.path}/${space.id}`} className="hover:underline">             
                    <h3 className="text-3xl font-bold max-w-[200px] text-ellipsis">{space.name}</h3>
                  </Link>
                )} 
              >
                <SpaceCardActions
                  space={space} 
                  onClickUpdate={openUpdateSpaceModal} 
                  onClickRemove={openDeleteSpaceModal} 
                />
              </SpaceCard>
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </ShowContent>
      </div>
    </ManagementPageLayout>
  )
}

export default SpacePage