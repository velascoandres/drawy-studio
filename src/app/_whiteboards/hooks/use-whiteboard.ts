'use client'

import { useParams } from 'next/navigation'

import { type ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { type AppState, type BinaryFiles } from '@excalidraw/excalidraw/types/types'

import { useDebounceCallback } from '@/app/_shared/hooks/use-debounce-callback'
import { api } from '@/trpc/react'


export const useWhiteboard = () => {
  const params = useParams()
  const utils = api.useUtils()
  
  const { mutate: updateContent } = api.whiteboard.updateUserWhiteboardContent.useMutation({
    onSuccess: () => {
      void utils.whiteboard.findUserWhiteboardById.invalidate()
    }
  })
    
  const { data: whiteboard } = api.whiteboard.findUserWhiteboardById.useQuery({
    id: Number(params.id),
  }, { 
    enabled: Boolean(params.id), 
  })

  const debounce = useDebounceCallback(1000)

  const handleChange = (elements: ExcalidrawElement[], appState: AppState, files?: BinaryFiles) => {
    if (!elements.length) {
      return
    }
    if (!whiteboard) {
      return
    }

    const filesToUpdate = files ?? {}

    const payload = {
      scene: { 
        elements, 
        appState: {
          viewBackgroundColor: appState.viewBackgroundColor,
          currentItemFontFamily: appState.currentItemFontFamily,
          currentItemFontSize: appState.currentItemFontSize,
          theme: appState.theme,
          exportWithDarkMode: appState.exportWithDarkMode,
          gridSize: appState.gridSize,
        }, 
        scrollToContent: true, 
        files: Object.values(filesToUpdate),
        rawFiles: filesToUpdate,
      },
    }

    updateContent({
      id: whiteboard.id,
      content: {
        scene: payload.scene,
      }
    })
  }

  const onChangeHandler = (elements: ExcalidrawElement[], appState: AppState, files?: BinaryFiles) => {
    debounce(() => handleChange(elements, appState, files))
  }


  return {
    whiteboard,
    onChangeHandler
  }
}
