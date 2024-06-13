import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuSeparator, 
  ContextMenuTrigger
} from '@/app/_shared/components/ui/context-menu'
import { COLORS } from '@/constants/colors'

import { type Space } from '../interfaces/space'


interface Props {
    space: Space
    children?: React.ReactNode | React.ReactNode[]
}

interface SpaceCardActions {
  space: Space
  onClickRemove: (space: Space) => void
  onClickUpdate: (space: Space) => void
}


export const SpaceCard = ({
  space,
  children,
}: Props) => {

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <article  
          className="overflow-hidden w-full min-w-[15rem]  md:max-w-sm transition ease-in group relative select-none h-15 flex flex-row items-center gap-2 justify-start rounded-lg px-3 py-5 border border-border hover:bg-primary/15"
        >
          <div className="h-7 w-7 rounded-full" style={{ background: space.style?.background.value ?? COLORS[0], color: space.style?.textColor }}></div>
          <h3 className="text-2xl font-normal max-w-xs text-ellipsis">{space.name}</h3>
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
    <ContextMenuContent className="dark:bg-popover/80 backdrop-blur-md">
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