import React, { useState } from 'react'

import { cn } from '@/lib/utils'

interface Props {
    value?: string
    options: string[]
    onSelect(selected: string): void
}


export const ColorSelector = ({
  value = '',
  options,
  onSelect,
}:Props) => {
  const [selectedColor, setSelectedColor] = useState(value)

  const handleSelect = (val: string) => {
    setSelectedColor(val)
    onSelect(val)
  }

  return (
    <div className="flex flex-wrap justify-start gap-2">
      {
        options.map(value => (
          <div 
            key={`color-${value}`} 
            className={cn(
              'transition ease-in w-10 h-10 cursor-pointer border border-border rounded-full', {
                'scale-105 ring ring-primary': value === selectedColor
              },
            )} 
            onClick={() => handleSelect(value)}
            style={{
              background: value
            }}>
          </div>
        ))
      }
    </div>
  )
}