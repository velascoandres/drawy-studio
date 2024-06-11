import React from 'react'

import { COLORS } from '@/constants/colors'

import { type Space } from '../interfaces/space'

interface Props {
    space: Space
}

export const SpaceMiniCard = ({ space }: Props) => {
  return (
    <article  
      className="overflow-hidden w-full transition ease-in relative select-none px-2 py-3 h-5 flex flex-col items-start gap-2 justify-center rounded-[5px]"
      style={{ background: space.style?.background?.value ?? COLORS[0], color: space.style?.textColor }}  
    >
      <span className="text-sm text-pretty font-semibold text-ellipsis">{space.name}</span>
    </article>
  )
}
