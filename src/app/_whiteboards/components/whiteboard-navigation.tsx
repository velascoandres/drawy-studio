import React from 'react'
import Link from 'next/link'
import { Group,Presentation } from 'lucide-react'

import { ProfileCard } from '@/app/_auth/components/profile-card'

interface Props {
  whiteboardName: string
  spaceId?: number | null
}


export const WhiteboardNavigation = ({ whiteboardName, spaceId }: Props) => {

  return (
    <nav className="z-20 fixed inline-flex items-center justify-between bottom-4 right-[30%] left-[30%] bg-background rounded-full px-2 py-1 gap-2 border border-border">
      <div className="inline-flex justify-start gap-2">
        <Link href="/whiteboards" className="transition ease-in hover:text-secondary rounded-full p-2 hover:bg-secondary-foreground">
          <Presentation />
        </Link>

        {
          spaceId && (
            <Link href={`/spaces/${spaceId}`} className="transition ease-in hover:text-secondary rounded-full p-2 hover:bg-secondary-foreground">
              <Group />
            </Link>
          )
        }
      </div>

      <h1 className="font-bold max-w-xs text-ellipsis">{whiteboardName}</h1>

      <ProfileCard /> 
    </nav>
  )
}
