import React from 'react'
import Link from 'next/link'
import { Group } from 'lucide-react'

import { ProfileMenu } from '@/app/_auth/components/profile-menu'
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  navigationMenuTriggerStyle
} from '@/app/_shared/components/ui/navigation-menu'

interface Props {
  whiteboardName: string
  description?: string
  spaceId?: number | null
}


export const WhiteboardNavigation = ({ whiteboardName, spaceId }: Props) => {

  return (
    <NavigationMenu className="z-[2] fixed inline-flex items-center justify-between bottom-16 md:bottom-4 center-fixed bg-background rounded-md px-3 py-1 gap-2 border border-border">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem className="font-bold max-w-xs text-ellipsis">
          {whiteboardName}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={spaceId ? `/spaces/${spaceId}`: '/spaces/pending'}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Group />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="pt-1">
          <ProfileMenu />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
