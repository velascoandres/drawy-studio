'use client'

import Link from 'next/link'
import { FilePenLine, Menu, Split, Trash2 } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from '@/app/_shared/components/ui/dropdown-menu'
import { SpaceBadge } from '@/app/_spaces/components/space-badge'

import { type  Whiteboard } from '../interfaces/whiteboard'

import { WhiteboardPreview } from './whiteboard-preview'


interface ListItemProps {
    whiteboard: Whiteboard
    onClick?: (item: Whiteboard) => void
    children?: React.ReactNode
}

interface WhiteboardActionsProps {
  whiteboard: Whiteboard

  onClickDelete(): void
  onClickUpdate(): void
  onClickDetach(): void
}

export const WhiteboardCard = ({ whiteboard, children }: ListItemProps) => {
  const { name, description, content } = whiteboard
    
  return (
    <article 
      className=" w-full md:max-w-sm  gap-4 border-2  hover:border-white flex flex-col items-start bg-gradient-to-br from-gray-900 to-indigo-950 break-words overflow-hidden text-ellipsis transition ease-in rounded-md"         
    >
      <div className="group relative w-full h-full flex overflow-hidden flex-col items-center">
        <WhiteboardPreview className="rounded-md" name={name} content={content} />
        <div 
          className="h-full  transition ease-in bg-gradient-to-br from-gray-900 to-secondary/60 absolute bottom-0 w-full px-2 flex flex-col justify-between gap-2 break-words text-ellipsis"
          
        >
          <div className="flex flex-col gap-2 pt-2">
            <Link href={`/whiteboard/${whiteboard.id}`} className="cursor-pointer transition ease-in w-full">
              <h4 className="text-primary text-lg font-bold select-none flex items-center line-clamp-1 text-ellipsis hover:underline tracking-tight">
                {name}
              </h4>
            </Link>


            <p className="font-medium text-sm text-ellipsis text-pretty text-primary/70">
              {description}
            </p>
          </div>

          <div className="inline-flex justify-between gap-2 items-center">
            {children} { whiteboard.space && <Link href={`/spaces/${whiteboard.space.id}`}> <SpaceBadge space={whiteboard.space} /></Link>}
          </div>
          
        </div>
      </div>
    </article>     
  )
}
  
  
export const WhiteboardActions = ({
  whiteboard,
  onClickDelete,
  onClickUpdate,
  onClickDetach
}: WhiteboardActionsProps) => {
  
  return (
    <div className="mb-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <div className="flex items-center gap-2">
              <Menu /> 
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="base-bg border-gray-800">
          <DropdownMenuItem
            onClick={onClickUpdate}
            className="cursor-pointer flex justify-start gap-2"
          >
            <FilePenLine className="h-5 w-5" /> Edit information
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {
            whiteboard.space && (
              <DropdownMenuItem
                onClick={onClickDetach}
                className="cursor-pointer flex justify-start gap-2 text-red-600"
              >
                <Split className="h-5 w-5" /> Detach from space
              </DropdownMenuItem>
            )
          }          
          <DropdownMenuItem
            onClick={onClickDelete}
            className="cursor-pointer flex justify-start gap-2 text-red-600"
          >
            <Trash2 className="h-5 w-5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}