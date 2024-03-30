'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

import { type ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { 
  type AppState, 
  type BinaryFiles, 
  type ExcalidrawImperativeAPI, 
  type ExcalidrawInitialDataState 
} from '@excalidraw/excalidraw/types/types'

import { decompressContent } from '@/lib/compress-whiteboard'


export interface Content {
  scene: {
    elements: readonly ExcalidrawElement[]
    appState?: AppState
    files?: BinaryFiles
    // rawFiles?: BinaryFiles
  }
}


export type WhiteboardChangeEventHandler = (elements: readonly ExcalidrawElement[], appState?: AppState, files?: BinaryFiles) => void

interface Props {
  id: number
  viewModeEnabled?: boolean
  initialContent?: Content
  onChange?: WhiteboardChangeEventHandler
}

interface RawContentProps extends Omit<Props, 'initialContent'> {
  id: number
  viewModeEnabled?: boolean
  initialRawCompressed?: string
  onChange?: WhiteboardChangeEventHandler
}

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
  },
)

const WelcomeScreen = dynamic(
  async () => (await import('@excalidraw/excalidraw')).WelcomeScreen,
  {
    ssr: false,
  },
)

export const Whiteboard = ({
  initialContent,
  onChange = () => null,
  viewModeEnabled = false
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

    excalidrawAPI.addFiles(Object.values(files ?? {}))

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
      viewModeEnabled={viewModeEnabled}
    >
      <WelcomeScreen />
    </Excalidraw>
  )
}


export const WhiterboardFromCompressed = ({ initialRawCompressed,
  ...rest
}: RawContentProps) => {
   
  const [initialContent, setInitialContent] = useState<Content>()

  useEffect(() => {
    if (!initialRawCompressed){
      return
    }
    void decompressContent(initialRawCompressed)
    .then((content) => setInitialContent(content as unknown as Content))
  }, [initialRawCompressed])

  return <Whiteboard {...rest} initialContent={initialContent} />
}