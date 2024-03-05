'use client'

import Link from 'next/link'
import { Braces,FileImage,FilePenLine, ImageDown,Split, Trash2 } from 'lucide-react'

import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuSeparator, 
  ContextMenuTrigger
} from '@/app/_shared/components/ui/context-menu'
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
  onClickExportPng(): void
  onClickExportJson(): void
  onClickDownloadSvg(): void
}

export const WhiteboardCard = ({ whiteboard, children }: ListItemProps) => {
  const { name, description, content } = whiteboard
    
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <article 
          className=" w-full md:max-w-sm  gap-4 border-2  hover:border-primary flex flex-col items-start break-words overflow-hidden text-ellipsis transition ease-in rounded-md"         
        >
          <div className="group relative w-full h-full flex overflow-hidden flex-col items-center">
            <WhiteboardPreview name={name} content={content} />
            <div 
              className="h-full  transition ease-in bg-gradient-to-br from-gray-900 to-secondary/60 absolute bottom-0 w-full px-2 flex flex-col justify-between gap-2 break-words text-ellipsis"
          
            >
              <div className="flex flex-col gap-2 pt-2">
                <Link href={`/whiteboard/${whiteboard.id}`} className="cursor-pointer transition ease-in w-full">
                  <h4 className="text-secondary dark:text-primary text-lg font-bold select-none flex items-center line-clamp-1 text-ellipsis hover:underline tracking-tight">
                    {name}
                  </h4>
                </Link>


                <p className="font-medium text-sm text-ellipsis text-pretty text-secondary/85 dark:text-primary/70">
                  {description}
                </p>
              </div>

              <div className="inline-flex justify-start mb-2 gap-2 items-center">
                { whiteboard.space && <Link href={`/spaces/${whiteboard.space.id}`} className="hover:scale-105 transition ease-in hover:border-primary"> <SpaceBadge space={whiteboard.space} /></Link>}
              </div>
          
            </div>
          </div>
        </article>
        {children}  
      </ContextMenuTrigger>   
    </ContextMenu>
  )
}
  
  
export const WhiteboardActions = ({
  whiteboard,
  onClickDelete,
  onClickUpdate,
  onClickDetach,
  onClickDownloadSvg,
  onClickExportJson,
  onClickExportPng,
}: WhiteboardActionsProps) => {
  
  return (
    <ContextMenuContent className="bg-popover/60 backdrop-blur-md">
      <ContextMenuItem
        onClick={onClickUpdate}
        className="cursor-pointer flex justify-start gap-2"
      >
        <FilePenLine className="h-5 w-5" /> Edit information
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem
        onClick={onClickDownloadSvg}
        className="cursor-pointer flex justify-start gap-2"
      >
        <ImageDown className="h-5 w-5" /> Download as SVG
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem
        onClick={onClickExportJson}
        className="cursor-pointer flex justify-start gap-2"
      >
        <Braces className="h-5 w-5" /> Copy to clipboard as JSON
      </ContextMenuItem>

      <ContextMenuItem
        onClick={onClickExportPng}
        className="cursor-pointer flex justify-start gap-2"
      >
        <FileImage className="h-5 w-5" /> Copy to clipboard as PNG
      </ContextMenuItem>

      <ContextMenuSeparator />
      {
        whiteboard.space && (
          <ContextMenuItem
            onClick={onClickDetach}
            className="cursor-pointer flex justify-start gap-2 text-red-600"
          >
            <Split className="h-5 w-5" /> Detach from space
          </ContextMenuItem>
        )
      }          
      <ContextMenuItem
        onClick={onClickDelete}
        className="cursor-pointer flex justify-start gap-2 text-red-600"
      >
        <Trash2 className="h-5 w-5" /> Delete
      </ContextMenuItem>
    </ContextMenuContent>
  )
}