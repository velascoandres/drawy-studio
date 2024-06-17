'use client'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Group } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { CustomDropdown, type DropdownItem } from '@/app/_shared/components/ui/custom-dropdown'
import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { SpaceMiniCard } from '@/app/_spaces/components/space-mini-card'
import { type Space } from '@/app/_spaces/interfaces/space'
import { DEFAULT_STYLE } from '@/constants/colors'
import { NAVIGATION } from '@/constants/navigation'
import { DEFAULT_SPACE } from '@/constants/spaces'
import { api } from '@/trpc/react'

import { useWorkspace } from '../hooks/use-workspace'


export const SpaceSelector = () => {
  const { changeWorkspace, removeCurrentSpace, currentSpace } = useWorkspace()

  const { data: response, isLoading } = api.space.findUserSpaces.useQuery({ search: '' })

  const router = useRouter()

  console.log(currentSpace?.id)
    
  const spaceItems = useMemo(() => {
    const spaceItems = response?.data?.map(
      (space) =>
            ({
              data: space,
              label: space.name,
              value: space.id,
            }) as DropdownItem<Space>,
    ) ?? []

    return [
      {
        data: {
          id: 0,
          name: 'Default space',
          style: DEFAULT_STYLE,
        },
        label: DEFAULT_SPACE,
        value: DEFAULT_SPACE,
      },
      ...spaceItems,
    ]
  }, [response])

  const handleSelectSpace = ({ value, data }: DropdownItem<Space>) => {
    if (value === DEFAULT_SPACE){
      removeCurrentSpace()
      
      return
    }
    changeWorkspace(data)
  }

  const navigateToSpaces = () => {
    router.push(NAVIGATION.SPACES.path)
  }

  if (isLoading){
    return <Skeleton className="w-[180px] h-10" />
  }

  return (
    <CustomDropdown
      key={currentSpace?.id}
      title="Your spaces"
      items={spaceItems}
      value={currentSpace?.id.toString() ?? DEFAULT_SPACE}
      onSelect={handleSelectSpace}
      renderActions={() => (
        <Button onClick={navigateToSpaces} variant="ghost" className="inline-flex items-center justify-start gap-2 mt-1 w-full">
          <Group className="h-5 w-5 text-primary/50" />
          <span className="text-pretty text-xs text-primary/50">
            Manage spaces
          </span>
        </Button>
      )}
    >
      {({ data }) => <SpaceMiniCard title={data.name} background={data.style.background.value} isDefault={!Boolean(data.id)} />}
    </CustomDropdown>
  )
}







