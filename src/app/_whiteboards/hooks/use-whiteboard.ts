'use client'

import { useEffect, useState } from 'react'
import compare from 'just-compare'

import { type ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { type AppState, type BinaryFiles } from '@excalidraw/excalidraw/types/types'
import { useQueryClient } from '@tanstack/react-query'

import { useDebounceCallback } from '@/app/_shared/hooks/use-debounce-callback'
import { api } from '@/trpc/react'

import { type Whiteboard } from '../interfaces/whiteboard'


export const useWhiteboard = (id: number) => {
  const queryClient = useQueryClient()

  const { data: whiteboard, isLoading } = api.whiteboard.findUserWhiteboardById.useQuery({
    id: Number(id),
  }, { 
    enabled: Boolean(id),
    cacheTime: Infinity, 
    queryKey: ['whiteboard.findUserWhiteboardById', { id: Number(id) }],
  })

  const [currentWhiteboard, setWhiteboard] = useState<typeof whiteboard>(whiteboard)

  
  const { mutate: updateContent } = api.whiteboard.updateUserWhiteboardContent.useMutation({
    onMutate: async ({ content }) => {
      await queryClient.cancelQueries(['whiteboard.findUserWhiteboardById', { id: Number(id) }])

      const prevWhiteboard = queryClient.getQueryData(['whiteboard.findUserWhiteboardById', { id: Number(id) }])
    
      queryClient.setQueryData(['whiteboard.findUserWhiteboardById', { id: Number(id) }], (old: unknown) => {
        const oldWhiteboard = old as Whiteboard

        setWhiteboard({
          ...oldWhiteboard,
          content,
        } as typeof whiteboard)

        return {
          ...oldWhiteboard,
          content,
        }
      })

      return prevWhiteboard
    }
  })

  const debounce = useDebounceCallback(500)

  const handleChange = (elements: ExcalidrawElement[], appState: AppState, files?: BinaryFiles) => {
    if (!elements.length) {
      return
    }

    if (!currentWhiteboard) {
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
        files: filesToUpdate,
      },
    }

    const areSame = compare(payload, currentWhiteboard.content)


    if (areSame){
      return
    }

    updateContent({
      id: currentWhiteboard.id,
      content: {
        scene: {
          ...payload.scene,
        },
      }
    })
  }

  const onChangeHandler = (elements: ExcalidrawElement[], appState: AppState, files?: BinaryFiles) => {
    debounce(() => handleChange(elements, appState, files))
  }

  useEffect(() => {
    setWhiteboard(whiteboard)
  }, [whiteboard])


  return {
    isLoading,
    whiteboard,
    onChangeHandler
  }
}
