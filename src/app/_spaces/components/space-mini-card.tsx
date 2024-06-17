import React from 'react'

import { COLORS } from '@/constants/colors'
import { cn } from '@/lib/utils'

interface Props {
    title: string
    background?: string
    isDefault?: boolean
}

export const SpaceMiniCard = ({ title, background, isDefault }: Props) => {
  return (
    <article  
      className="overflow-hidden w-full transition ease-in relative select-none inline-flex gap-2 justify-start items-center"  
    >
      <div className="w-5 h-5 rounded-full" style={{ background: background ?? COLORS[0] }}></div>
      <span className={cn('text-xs text-pretty text-primary/75 text-ellipsis', {
        'italic font-medium': isDefault
      })}>{title}</span>
    </article>
  )
}
