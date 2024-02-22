'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

import { type ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { 
  type AppState, 
  type BinaryFileData,
  type BinaryFiles, 
  type ExcalidrawImperativeAPI, 
  type ExcalidrawInitialDataState } from '@excalidraw/excalidraw/types/types'


export interface Content {
  scene: {
    elements: readonly ExcalidrawElement[]
    appState?: AppState
    files?: BinaryFileData[]
  }
}

interface Props {
  id: number
  initialContent?: Content
  onChange(elements: readonly ExcalidrawElement[], appState?: AppState, files?: BinaryFiles): void
}

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
  },
)

export const Whiteboard = ({
  initialContent,
  onChange,
}: Props) => {
  const [excalidrawAPI, setExcalidrawApi] = useState<ExcalidrawImperativeAPI | null>(null)
  const hasLoadedWhiteboardRef = useRef<boolean>(false)


  useEffect(() => {
    if(!excalidrawAPI){
      return
    }

    if(hasLoadedWhiteboardRef.current){
      return
    }

    if (!initialContent){
      return
    }
    
    const files = initialContent?.scene?.files

    if (files?.length) {
      excalidrawAPI.addFiles(files)
    }

    excalidrawAPI.updateScene({
      elements: initialContent?.scene?.elements,
      appState: initialContent?.scene?.appState,
    })
    excalidrawAPI.scrollToContent()


    hasLoadedWhiteboardRef.current = true

  }, [excalidrawAPI, initialContent])

 
  return (
    <Excalidraw
      excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawApi(api)}  
      onChange={onChange}
      initialData={{
        ...(initialContent?.scene ?? {}) as ExcalidrawInitialDataState 
      }}
    />
  )
}
  