import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { type ExcalidrawElement, type NonDeleted } from '@excalidraw/excalidraw/types/element/types'

import { Skeleton } from '@/app/_shared/components/ui/skeleton'
import { IMAGES } from '@/constants/images'
import { blobToBase64 } from '@/lib/blob-to-base64'

import { type Whiteboard } from '../interfaces/whiteboard'

import { type Content } from './whiteboard'

interface Props {
   name: string 
   content: Whiteboard['content']
   className?: string
}


export const WhiteboardPreview = ({ name, content, className }: Props) => {
  const [preview, setPreview] = useState<string>()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const contentCasted = content as Content
  
    if (!contentCasted?.scene){
      setLoading(false)
  
      return
    }
  
    void import('@excalidraw/excalidraw')
    .then((excalidraw) => excalidraw.exportToBlob({
      elements: contentCasted.scene?.elements ?? [] as NonDeleted<ExcalidrawElement>[],
      appState: {
        ...(contentCasted.scene?.appState ?? {}),
        exportWithDarkMode: contentCasted.scene.appState?.theme === 'dark' 
      },
      files: contentCasted.scene?.rawFiles ?? {},
    }))
    .then(blobToBase64)
    .then((file) => setPreview(file as string))
    .finally(() => setLoading(false))
  }, [content])

  const imageClassname = `transition aspect-square ease-in w-full h-full object-cover ${className}`

  return (
    <>
      {
        loading ? (<Skeleton className={`bg-gray-500 h-[16rem] w-full md:max-w-sm ${className}`} />) : (
          preview ? (
            <Image 
              src={preview} 
              alt={name} 
              width={100} 
              height={150}
              draggable={false}
              className={imageClassname} 
            />
          ) : (
            <Image 
              src={IMAGES.EMPTY_STATE} 
              alt={name} 
              width={100} 
              height={150}
              draggable={false}
              className={'transition aspect-square ease-in w-full h-full pb-20'} 
            />
          )
        )
      }
    </>
  )
}
