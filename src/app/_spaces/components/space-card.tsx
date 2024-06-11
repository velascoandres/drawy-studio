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
    renderTitle?: (space: Space) => React.ReactNode
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
  renderTitle,
}: Props) => {

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <article  
          className="overflow-hidden w-full min-w-[15rem]  md:max-w-sm transition ease-in group relative select-none h-15 flex flex-col items-start gap-2 justify-start rounded-lg px-3 py-5 border-2 border-secondary hover:border-primary dark:border-secondary dark:hover:border-primary"
          style={{ background: space.style?.background.value ?? COLORS[0], color: space.style?.textColor }}  
        >
          {
            renderTitle ? renderTitle(space) : <h3 className="text-3xl font-bold max-w-xs text-ellipsis">{space.name}</h3>
          }

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