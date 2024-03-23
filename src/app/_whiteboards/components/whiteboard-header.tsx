'use client'

import React from 'react'
import Link from 'next/link'

import { Logo } from '@/app/_shared/components/navigation/logo'
import { Avatar, AvatarImage } from '@/app/_shared/components/ui/avatar'
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
} from '@/app/_shared/components/ui/navigation-menu'
import { cn } from '@/lib/utils'


interface Props {
    title: string
    description: string
    
    creator: {
        name: string
        avatarUrl?: string
    }
}


export const WhiteboardHeader = ({ title, description, creator }: Props) => {
  return (
    <NavigationMenu className="z-[2] px-3 py-2 rounded-md bg-background/80 backdrop-blur fixed inline-flex justify-center items-center top-4 center-fixed gap-2 border border-border">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <Link href="/">
            <Logo />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[15rem] md:min-w-[20rem] max-w-md flex flex-col gap-2 items-start px-3 py-4 text-sm">
            <p className={cn({ 'italic': !Boolean(description) })}>
              { description || 'This board has no description.' }
            </p>
            <div className="md:hidden text-sm flex gap-2 justify-center items-center">
              <Avatar>
                <AvatarImage src={creator.avatarUrl} />
              </Avatar>
              <div className="flex flex-col gap-1 text-xs items-center">
                <span>{ creator.name}</span>
                <span className="text-secondary px-1 rounded-xl bg-foreground text-center">Author </span> 
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex text-sm gap-2 justify-center items-center">
          <Avatar>
            <AvatarImage src={creator.avatarUrl} />
          </Avatar>
          <div className="flex flex-col gap-1 text-xs items-center">
            <span>{ creator.name}</span>
            <span className="text-secondary px-1 rounded-xl bg-foreground text-center">Author </span> 
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
