import React from 'react'

import { type Space } from '../interfaces/space'

interface Props {
    space: Space
}

export const SpaceBadge = ({ space }: Props) => {
  return (
    <div className="line-clamp-1  text-ellipsis inline-flex justify-center items-center text-xs py-1 px-2 border rounded-lg" style={{
      background: space.style.background.value,
      color: space.style.textColor
    }}>
      {space.name}
    </div>
  )
}
