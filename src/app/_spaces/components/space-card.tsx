import React from 'react'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/app/_shared/components/ui/dropdown-menu'
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
    <article  
      className="overflow-hidden transition ease-in group relative select-none h-56 flex flex-col items-start gap-2 justify-start rounded-lg px-3 py-5 border border-gray-800 hover:border-white"
      style={{ background: space.style?.background.value ?? COLORS[0], color: space.style?.textColor }}  
    >
      <header>
        {
          renderTitle ? renderTitle(space) : <h3 className="text-3xl font-bold max-w-[200px] text-ellipsis">{space.name}</h3>
        }
      </header>

      <p className="text-md whitespace-normal truncate overflow-ellipsis mb-4">
        {space.description}
      </p>

      {children}
    </article>
  )
}

export const SpaceCardActions = ({
  space,  
  onClickRemove,
  onClickUpdate,
}: SpaceCardActions) => { 
  return (
    <div className="absolute top-1 right-1 text-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full border-none px-2 bg-transparent hover:bg-gray-800/50" style={{
            color: space.style?.textColor
          }}>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="base-bg border-gray-800">
          <DropdownMenuItem
            onClick={() => onClickUpdate(space)}
            className="cursor-pointer flex justify-start gap-2"
          >
            <Edit className="h-5 w-5" /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onClickRemove(space)}
            className="cursor-pointer flex justify-start gap-2 text-red-600"
          >
            <Trash2 className="h-5 w-5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}