import React from 'react'
import Link from 'next/link'
import { Group,Presentation } from 'lucide-react'

import { ProfileCard } from '@/app/_auth/components/profile-card'
import { ProfileMenu } from '@/app/_auth/components/profile-menu'

interface Props {
  whiteboardName: string
  spaceId?: number | null
}


export const WhiteboardNavigation = ({ whiteboardName, spaceId }: Props) => {

  return (
    <nav className="z-[2] fixed inline-flex items-center justify-between bottom-16 md:bottom-4 right-[5%] left-[5%] md:right-[15%] md:left-[15%] lg:right-[30%] lg:left-[30%] bg-background rounded-full px-2 py-1 gap-2 border border-border">
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

      <div className="hidden md:block">
        <ProfileCard /> 
      </div>  
      <div className="block md:hidden">
        <ProfileMenu />
      </div>
    </nav>
  )
}
