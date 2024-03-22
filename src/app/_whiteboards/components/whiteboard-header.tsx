'use client'

import React from 'react'

import { Avatar, AvatarImage } from '@/app/_shared/components/ui/avatar'
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/app/_shared/components/ui/navigation-menu'


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
    <NavigationMenu className="z-[2] px-3 py-2 rounded-md bg-background/70 backdrop-blur-sm fixed inline-flex justify-center items-center top-4 center-fixed gap-2 border border-border">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[15rem] max-w-md px-3 py-4 text-sm">
            { description }
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-sm flex gap-2 justify-center items-center">
          <Avatar>
            <AvatarImage src={creator.avatarUrl} />
          </Avatar>
          <div className="flex flex-col gap-1 text-xs">
            <span>{ creator.name}</span>
            <span className="text-gray-400">Author </span> 
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
