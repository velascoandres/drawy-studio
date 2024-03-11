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
  const imageClassname = `transition aspect-square ease-in w-full h-full object-cover ${className}`

  return (
    <Image 
      src={previewUrl ?? IMAGES.EMPTY_STATE} 
      alt={name} 
      width={500} 
      height={500}
      draggable={false}
      className={imageClassname} 
    />
  )
}
