'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ExternalLink,FilePenLine, Split, Trash2 } from 'lucide-react'

import { Button } from '@/app/_shared/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/_shared/components/ui/dropdown-menu'
import { toast } from '@/app/_shared/hooks/use-toast'
import { cn, withStopPropagation } from '@/lib/utils'

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
    <article 
      className="relative w-full md:max-w-sm  gap-4 border-2  hover:border-primary flex flex-col items-start break-words overflow-hidden text-ellipsis transition ease-in rounded-md"         
    >
      <div className="group relative w-full h-full flex overflow-hidden flex-col items-center">
        <WhiteboardPreview name={name} previewUrl={previewUrl} />
        <div 
          className="h-full  transition ease-in bg-gradient-to-br from-gray-900 to-secondary/60 absolute bottom-0 w-full px-2 flex flex-col justify-between gap-2 break-words text-ellipsis"
        >
          <div className="flex flex-col gap-2 pt-2">
            <h4 className="text-secondary dark:text-primary text-lg font-bold select-none flex items-center line-clamp-1 text-ellipsis hover:underline tracking-tight">
              {name}
            </h4>
            <p className="font-medium text-sm text-ellipsis text-pretty text-secondary/85 dark:text-primary/70">
              {description}
            </p>
          </div>
          {
            whiteboard.isPublic && <Link href={`${window.location.origin}/view-whiteboard/${whiteboard.id}`} className="absolute bottom-0 left-0 hover:underline self-end transition ease-in hover:border-primary bg-[#63e] text-white rounded-tr-sm px-4 flex items-center gap-1 py-1">
              <ExternalLink className="h-4 w-4" /> <span className="text-sm">Public</span>
            </Link>
          }
        </div>
      </div>
      {children}  
    </article>
  )
}
  
  
export const WhiteboardActions = ({
  whiteboard,
  onClickDelete,
  onClickUpdate,
  onClickDetach,
}: WhiteboardActionsProps) => {

  const [isOpen, setIsOpen] = useState(false)

  const handleCopyClipboard = (content: string) => {
    void navigator.clipboard.writeText(content)

    toast({
      title: '✅ Copied to clipboard',
      description: content,
      duration: 2000,
    })
  }
  
  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger className="absolute bottom-2 right-2 z-40">
        <Button variant="outline" className="rounded-[5px] px-2 py-1 h-6 inline-flex text-primary/65 justify-center items-center gap-2">
          <span className="text-pretty text-xs">Actions</span> <ChevronDown className={cn('w-3 h-3 transition-all ease-in', {
            'rotate-180': isOpen
          })}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer flex justify-start gap-2 text-xs" onClick={withStopPropagation(onClickUpdate)}>
          <FilePenLine className="h-3 w-3" /> Edit information
        </DropdownMenuItem>
        {
          whiteboard.isPublic && (
            <DropdownMenuItem
              onClick={withStopPropagation(() => handleCopyClipboard(`${window.location.origin}/view-whiteboard/${whiteboard.id}`))}
              className="cursor-pointer flex justify-start gap-2 text-xs"
            >
              <ExternalLink className="h-3 w-3" /> Copy public link
            </DropdownMenuItem>
          )
        }
        <DropdownMenuSeparator />
        {
          whiteboard.space && (
            <DropdownMenuItem
              onClick={withStopPropagation(onClickDetach)}
              className="cursor-pointer flex justify-start gap-2 text-red-600 text-xs"
            >
              <Split className="h-3 w-3" /> Detach from space
            </DropdownMenuItem>
          )
        }          
        <DropdownMenuItem
          onClick={withStopPropagation(onClickDelete)}
          className="cursor-pointer flex justify-start gap-2 text-red-600 text-xs"
        >
          <Trash2 className="h-3 w-3" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>      
    </DropdownMenu>
  )
}