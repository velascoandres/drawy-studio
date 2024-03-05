import { type ExcalidrawElement, type NonDeleted } from '@excalidraw/excalidraw/types/element/types'

import { type Content } from '@/app/_whiteboards/components/whiteboard'


const exportToSVG = (content: Content) => {
  const contentCasted = content

  return import('@excalidraw/excalidraw')
  .then((excalidraw) => excalidraw.exportToSvg({
    elements: contentCasted.scene?.elements ?? [] as NonDeleted<ExcalidrawElement>[],
    appState: {
      ...(contentCasted.scene?.appState ?? {}),
      exportWithDarkMode: contentCasted.scene.appState?.theme === 'dark' 
    },
    files: contentCasted.scene?.files ?? {},
  }))
}

const exportToClipboard = (content: Content, target: 'png' | 'svg' | 'json' = 'png') => {
  const contentCasted = content
  
  return import('@excalidraw/excalidraw')
  .then((excalidraw) => excalidraw.exportToClipboard({
    elements: contentCasted.scene?.elements ?? [] as NonDeleted<ExcalidrawElement>[],
    appState: {
      ...(contentCasted.scene?.appState ?? {}),
      exportWithDarkMode: contentCasted.scene.appState?.theme === 'dark'
    },
    files: contentCasted.scene?.files ?? {},
    type: target,
  }))
}

const exportToPng = (content: Content) => {
  const contentCasted = content
  
  return import('@excalidraw/excalidraw')
  .then((excalidraw) => excalidraw.exportToBlob({
    elements: contentCasted.scene?.elements ?? [] as NonDeleted<ExcalidrawElement>[],
    appState: {
      ...(contentCasted.scene?.appState ?? {}),
      exportWithDarkMode: contentCasted.scene.appState?.theme === 'dark'
    },
    files: contentCasted.scene?.files ?? {},
    mimeType: 'image/png',
  }))
}


export {
  exportToSVG,
  exportToClipboard,
  exportToPng,
}