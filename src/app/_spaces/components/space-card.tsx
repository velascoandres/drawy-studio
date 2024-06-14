import React from 'react'
import { Crown,Edit, Presentation, Trash2 } from 'lucide-react'

import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuSeparator, 
  ContextMenuTrigger
} from '@/app/_shared/components/ui/context-menu'
import { COLORS } from '@/constants/colors'
import { cn } from '@/lib/utils'

import { type Space } from '../interfaces/space'


interface Props {
    title: string
    background?: string
    children?: React.ReactNode | React.ReactNode[]
    isActive?: boolean
    whiteboardsCount?: number
    onClick?: () => void
}

interface SpaceCardActions {
  space: Space
  onClickRemove: (space: Space) => void
  onClickUpdate: (space: Space) => void
}


export const SpaceCard = ({
  title,
  background = COLORS[0],
  isActive = false,
  whiteboardsCount = 0,
  onClick,
  children,
}: Props) => {

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <article  
          className={cn('relative overflow-hidden cursor-pointer w-full gap-4 min-w-[15rem]  md:max-w-sm transition ease-in group select-none h-28 flex flex-col rounded-lg px-3 py-5 border border-border hover:bg-primary/15', {
            'bg-primary/10': isActive
          })}
          onClick={onClick}
        >
          <Crown className={
            cn('invisible absolute top-3 right-3', {
              visible: isActive
            })
          } />
          <div className={cn('absolute top-0 flex w-full justify-center invisible', {
            visible: isActive
          })}>
            <div className="left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
          </div>
          <header className="inline-flex items-center gap-2 justify-start">
            <div 
              className="h-7 w-7 rounded-full" 
              style={{ background }}></div>
            <h3 className="text-2xl font-normal max-w-xs text-ellipsis">{title}</h3>
          </header>
          <footer className="inline-flex gap-2 justify-start items-center">
            <Presentation className="w-4 h-4 text-primary/45" /> 
            <span className="text-xs text-pretty text-primary/45">{whiteboardsCount} whiteboards</span>
          </footer>
        </article>
        {children}
      </ContextMenuTrigger>
    </ContextMenu>
  )
}

export const SpaceCardActions = ({
  space,  
  onClickRemove,
  onClickUpdate,
}: SpaceCardActions) => { 
  return (
    <ContextMenuContent className="dark:bg-popover/80 backdrop-blur-md pointer-events-none">
      <ContextMenuItem
        onClick={() => onClickUpdate(space)}
        className="cursor-pointer flex justify-start gap-2"
      >
        <Edit className="h-5 w-5" /> Edit
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem
        onClick={() => onClickRemove(space)}
        className="cursor-pointer flex justify-start gap-2 text-red-600"
      >
        <Trash2 className="h-5 w-5" /> Delete
      </ContextMenuItem>
    </ContextMenuContent>
  )
}