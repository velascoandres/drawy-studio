'use client'

import compare from 'just-compare'

import { type ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { type AppState, type BinaryFiles } from '@excalidraw/excalidraw/types/types'

import { useDebounceCallback } from '@/app/_shared/hooks/use-debounce-callback'
import { api } from '@/trpc/react'


export const useWhiteboard = (id: number) => {
  const utils = api.useUtils()
  
  const { mutate: updateContent } = api.whiteboard.updateUserWhiteboardContent.useMutation({
    onSuccess: () => {
      void utils.whiteboard.findUserWhiteboardById.invalidate()
    }
  })
    
  const { data: whiteboard, isLoading } = api.whiteboard.findUserWhiteboardById.useQuery({
    id: Number(id),
  }, { 
    enabled: Boolean(id),
    cacheTime: Infinity, 
  })

  const debounce = useDebounceCallback(200)

  const handleChange = (elements: ExcalidrawElement[], appState: AppState, files?: BinaryFiles) => {
    if (!elements.length) {
      return
    }
    if (!whiteboard) {
      return
    }

    const filesToUpdate = files ?? {}

    const filterdElements = elements
    .filter(({ isDeleted }) => !isDeleted)
    .map((element) =>({
      ...element,
      customData: element.customData ?? null
    }))

    const payload = {
      scene: { 
        elements: filterdElements, 
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

    const areSame = compare(payload, whiteboard.content)

    if (areSame){
      return
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
    isLoading,
    whiteboard,
    onChangeHandler
  }
}
