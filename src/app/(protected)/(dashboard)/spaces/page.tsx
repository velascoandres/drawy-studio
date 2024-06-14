'use client'

import { Group,PlusIcon } from 'lucide-react'

import { EmptyState } from '@/app/_shared/components/ui/empty-state'
import { SearchBox } from '@/app/_shared/components/ui/search-box'
import { ShowContent } from '@/app/_shared/components/ui/show-content'
import { SpaceCard, SpaceCardActions } from '@/app/_spaces/components/space-card'
import { SpaceCardsSkeleton } from '@/app/_spaces/components/space-cards-skeleton'
import { useSpaceList } from '@/app/_spaces/hooks/use-space-list'
import { useWorkspace } from '@/app/_spaces/hooks/use-workspace'
import { cn } from '@/lib/utils'

const SpacePage = () => {
  const { changeWorkspace, currentSpace } = useWorkspace()

  const {
    isLoading,
    spaces,
    currentSearch,
    openCreateSpaceModal,
    openDeleteSpaceModal,
    openUpdateSpaceModal,
    onSearchHandler
  } = useSpaceList()

  return (
    <main className="overflow-y-auto py-2 flex flex-col gap-4 items-start min-h-screen w-full">  
      <header className="px-4 py-2 z-10 fixed top-0 w-full flex flex-row flex-wrap items-center border border-transparent border-b-border gap-2">
        <div className="inline-flex gap-2 justify-start items-center">
          <Group className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Your spaces</h1>
        </div>
        <div className="md:basis-2/3 w-full flex flex-row justify-start md:justify-center items-center gap-2">
          <div className="md:basis-1/2 w-full">
            <SearchBox placeholder="Search in your spaces" onSearch={onSearchHandler} value={currentSearch} />
          </div>
        </div>
      </header>
      <section className="flex-1 flex flex-col px-4 pt-32 md:pt-20 w-full h-full">
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
            <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 w-full gap-3">
              {spaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  title={space.name}
                  whiteboardsCount={space.totalWhiteboards}
                  background={space.style.background.value}
                  isActive={space.id === currentSpace?.id}
                  onClick={() => changeWorkspace(space)}
                >
                  <SpaceCardActions
                    space={space} 
                    onClickUpdate={openUpdateSpaceModal} 
                    onClickRemove={openDeleteSpaceModal} 
                  />
                </SpaceCard>
              ))}
              <article onClick={openCreateSpaceModal} role="button" className="flex flex-col items-center justify-center text-primary/45 cursor-pointer w-full gap-4 min-w-[15rem]  md:max-w-sm transition ease-in group select-none h-28 rounded-lg px-3 py-5 border-2 border-dashed border-border hover:bg-primary/15">
                <div className="inline-flex gap-2 justify-center items-center">
                  <PlusIcon /> <span className="font-semibold text-lg text-pretty">Add new space</span>
                </div>
              </article>
            </div>
          </ShowContent>
        </div>
      </section>  
    </main>
  )
}

export default SpacePage
