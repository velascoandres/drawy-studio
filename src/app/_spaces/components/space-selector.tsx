'use client'

import React, { useMemo } from 'react'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { CustomDropdown, type DropdownItem } from '@/app/_shared/components/ui/custom-dropdown'
import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { useWorkspaceStore } from '@/app/_shared/store/workspace-store'
import { SpaceMiniCard } from '@/app/_spaces/components/space-mini-card'
import { useSpaceList } from '@/app/_spaces/hooks/use-space-list'
import { type Space } from '@/app/_spaces/interfaces/space'
import { DEFAULT_STYLE } from '@/constants/colors'
import { DEFAULT_SPACE } from '@/constants/spaces'


export const SpaceSelector = () => {
  const store = useWorkspaceStore()

  const {
    isLoading,
    spaces,
    openCreateSpaceModal,
  } = useSpaceList()
    
  const spaceItems = useMemo(() => {
    const spaceItems = spaces.map(
      (space) =>
            ({
              data: space,
              label: space.name,
              value: space.id,
            }) as DropdownItem,
    )

    return [
      {
        data: {
          id: 0,
          name: DEFAULT_SPACE,
          style: DEFAULT_STYLE,
        },
        label: DEFAULT_SPACE,
        value: DEFAULT_SPACE,
      },
      ...spaceItems,
    ]
  }, [spaces])

  const handleSelectSpace = ({ value, data }: DropdownItem) => {
    if (value === DEFAULT_SPACE){
      void store.removeCurrentSpace()
    } else{
      void store.setCurrentSpace(data as Space)
    }
  }

  if (isLoading){
    return <Skeleton className="w-[180px] h-10" />
  }

  return (
    <CustomDropdown
      title="Your spaces"
      items={spaceItems}
      value={store.currentSpace?.id.toString()}
      onSelect={handleSelectSpace}
      renderActions={() => (
        <Button onClick={openCreateSpaceModal} variant="ghost" className="inline-flex items-center justify-start gap-2 mt-1 w-full">
          <PlusIcon className="h-5 w-5" />
          <span className="text-pretty text-sm text-primary/50">
            Add workspace
          </span>
        </Button>
      )}
    >
      {(item) => <SpaceMiniCard space={item.data as Space} />}
    </CustomDropdown>
  )
}
