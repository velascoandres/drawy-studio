import React from 'react'

import { COLORS } from '@/constants/colors'

import { type Space } from '../interfaces/space'

interface Props {
    space: Space
}

export const SpaceMiniCard = ({ space }: Props) => {
  return (
    <article  
      className="overflow-hidden w-full transition ease-in relative select-none inline-flex gap-2 justify-start items-center"  
    >
      <div className="w-5 h-5 rounded-full" style={{ background: space.style?.background?.value ?? COLORS[0], color: space.style?.textColor }}></div>
      <span className="text-xs text-pretty text-primary/75 text-ellipsis">{space.name}</span>
    </article>
  )
}
