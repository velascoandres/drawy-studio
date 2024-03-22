'use client'

import Link from 'next/link'
import { ExternalLink,FilePenLine, Split, Trash2 } from 'lucide-react'

import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuSeparator, 
  ContextMenuTrigger
} from '@/app/_shared/components/ui/context-menu'
import { toast } from '@/app/_shared/hooks/use-toast'
import { SpaceBadge } from '@/app/_spaces/components/space-badge'

import { type  Whiteboard } from '../interfaces/whiteboard'

import { WhiteboardPreview } from './whiteboard-preview'


interface ListItemProps {
    whiteboard: Omit<Whiteboard, 'content'>
    onClick?: (item: Whiteboard) => void
    children?: React.ReactNode
}

interface WhiteboardActionsProps {
  whiteboard: Omit<Whiteboard, 'content'>

  onClickDelete(): void
  onClickUpdate(): void
  onClickDetach(): void
}

export const WhiteboardCard = ({ whiteboard, children }: ListItemProps) => {
  const { name, description, previewUrl } = whiteboard
    
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <article 
          className=" w-full md:max-w-sm  gap-4 border-2  hover:border-primary flex flex-col items-start break-words overflow-hidden text-ellipsis transition ease-in rounded-md"         
        >
          <div className="group relative w-full h-full flex overflow-hidden flex-col items-center">
            <WhiteboardPreview name={name} previewUrl={previewUrl} />
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
              {
                whiteboard.isPublic && <Link target="_blank" href={`${window.location.origin}/view-whiteboard/${whiteboard.id}`} className="absolute bottom-0 right-0 hover:underline self-end transition ease-in hover:border-primary bg-[#63e] rounded-tl-sm px-4 flex items-center gap-1 py-1">
                  <ExternalLink className="h-4 w-4" /> <span className="text-sm">Public</span>
                </Link>
              }
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
}: WhiteboardActionsProps) => {

  const handleCopyClipboard = (content: string) => {
    void navigator.clipboard.writeText(content)

    toast({
      title: '✅ Copied to clipboard',
      description: content,
      duration: 2000,
    })
  }
  
  return (
    <ContextMenuContent className="dark:bg-popover/80 backdrop-blur-md">
      <ContextMenuItem
        onClick={onClickUpdate}
        className="cursor-pointer flex justify-start gap-2"
      >
        <FilePenLine className="h-5 w-5" /> Edit information
      </ContextMenuItem>

      {
        whiteboard.isPublic && (
          <ContextMenuItem
            onClick={() => handleCopyClipboard(`${window.location.origin}/view-whiteboard/${whiteboard.id}`)}
            className="cursor-pointer flex justify-start gap-2"
          >
            <ExternalLink className="h-5 w-5" /> Copy public link
          </ContextMenuItem>
        )
      }

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