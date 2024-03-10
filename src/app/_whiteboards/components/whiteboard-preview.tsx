import React from 'react'
import Image from 'next/image'

import { IMAGES } from '@/constants/images'

import { type Whiteboard } from '../interfaces/whiteboard'


interface Props {
   name: string 
   previewUrl: Whiteboard['previewUrl']
   className?: string
}


export const WhiteboardPreview = ({ name, previewUrl, className }: Props) => {
  // const [preview, setPreview] = useState<string>()
  // const [loading, setLoading] = useState(true)
  
  // useEffect(() => {
  //   const contentCasted = content as Content
  
  //   if (!contentCasted?.scene){
  //     setLoading(false)
  
  //     return
  //   }
  
  //   void import('@excalidraw/excalidraw')
  //   .then((excalidraw) => excalidraw.exportToBlob({
  //     elements: contentCasted.scene?.elements ?? [] as NonDeleted<ExcalidrawElement>[],
  //     appState: {
  //       ...(contentCasted.scene?.appState ?? {}),
  //       exportWithDarkMode: contentCasted.scene.appState?.theme === 'dark' 
  //     },
  //     files: contentCasted.scene?.files ?? {},
  //   }))
  //   .then(blobToBase64)
  //   .then((file) => setPreview(file as string))
  //   .finally(() => setLoading(false))
  // }, [content])

  const imageClassname = `transition aspect-square ease-in w-full h-full object-cover ${className}`

  return (
    <Image 
      src={previewUrl ?? IMAGES.EMPTY_STATE} 
      alt={name} 
      width={100} 
      height={150}
      draggable={false}
      className={imageClassname} 
    />
  )
}
