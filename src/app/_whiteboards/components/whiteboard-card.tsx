'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FilePenLine, Menu, Trash2 } from 'lucide-react'

import { type ExcalidrawElement, type NonDeleted } from '@excalidraw/excalidraw/types/element/types'
import { type AppState, type BinaryFiles } from '@excalidraw/excalidraw/types/types'

import { Button } from '@/app/_shared/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/_shared/components/ui/dropdown-menu'
import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { IMAGES } from '@/constants/images'
import { blobToBase64 } from '@/lib/blob-to-base64'
import { cn } from '@/lib/utils'

import { useWhiteboard } from '../hooks/use-whiteboard'

interface WhiteboardItem {
    id: number
    name: string
    description?: string | null
}

interface ListItemProps {
    item: WhiteboardItem
    onClick?: (item: WhiteboardItem) => void
    children: React.ReactNode
}

interface WhiteboardActionsProps {
  onClickDelete(): void
  onClickUpdate(): void
}

interface Content {
  scene: {
    elements: ExcalidrawElement[]
    appState: AppState
    rawFiles: BinaryFiles
  }
}

const DEFAULT_DESCRIPTION = 'This whiteboard does not have any description'

export const WhiteboardCard = ({ item, children }: ListItemProps) => {
  const { name, description } = item

  const [preview, setPreview] = useState<string>()
  const [loading, setLoading] = useState(true)

  const { whiteboard } = useWhiteboard(item.id)

  useEffect(() => {
    const content = whiteboard?.content as Content

    if (!content?.scene){
      setLoading(false)

      return
    }

    void import('@excalidraw/excalidraw')
    .then((excalidraw) => excalidraw.exportToBlob({
      elements: content.scene?.elements ?? [] as NonDeleted<ExcalidrawElement>[],
      appState: content.scene?.appState ?? {},
      files: content.scene?.rawFiles ?? {},
    }))
    .then(blobToBase64)
    .then((file) => setPreview(file as string))
    .finally(() => setLoading(false))
  }, [whiteboard])
    
  return (
    <article 
      className="max-w-xs max-h-[30rem] relative gap-4 flex flex-col items-start bg-neutral-800 break-words overflow-hidden text-ellipsis transition ease-in rounded-lg"         
    >
      <Link href={`/whiteboards/${item.id}`} className="w-full h-full basis-3/4 rounded-t-lg cursor-pointer flex overflow-hidden flex-col items-center">
        {
          loading ? (<Skeleton className="bg-gray-500 w-[20rem] h-[20rem] rounded-none rounded-t-lg" />) : (
            preview ? (
              <Image 
                src={preview} 
                alt={item.name} 
                width={100} 
                height={150}
                content="cover"
                className="transition ease-in w-full h-full rounded-t-lg hover:scale-110" 
              />
            ) : (
              <Image 
                src={IMAGES.EMPTY_STATE} 
                alt={item.name} 
                width={100} 
                height={150}
                content="cover"
                className="transition ease-in w-full h-auto rounded-t-lg hover:scale-110" 
              />
            )
          )
        }
      </Link>
      <div className="basis-1/4 px-2 flex flex-col justify-between gap-2 mb-2 break-words text-ellipsis">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold select-none flex items-center">
            {name}
          </h4>
          <p className={cn('text-white/50 break-words text-ellipsis', {
            'italic': !description 
          })}>
            {description ? description : DEFAULT_DESCRIPTION}
          </p>
        </div>

        {children}
      </div>
  
    </article>     
  )
}
  
  
export const WhiteboardActions = ({
  onClickDelete,
  onClickUpdate
}: WhiteboardActionsProps) => {
  
  return (
    <div className="mb-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="bg-indigo-600 text-white hover:bg-indigo-500">
            <div className="flex items-center gap-2">
              <Menu /> Options 
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