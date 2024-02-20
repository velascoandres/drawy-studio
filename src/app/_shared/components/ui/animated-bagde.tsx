import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
    children: React.ReactNode | React.ReactNode[]
    role?: string
    className?: string
    style?: 'yellow' | 'blue' | 'black' | 'red' | 'purple'
    onClick?: () => void
}


export const AnimatedBagde = ({
  children,
  role='',
  className='',
  style='yellow',
  onClick
}: Props) => {
  return (
    <span role={role} onClick={onClick}  className={`relative inline-flex overflow-hidden rounded-full p-[1px] text-white/80 ${className}`}>
      <span
        className={
          cn('absolute inset-[-1000%] animate-[spin_2s_linear_infinite]', {
            'bg-[conic-gradient(from_90deg_at_50%_50%,#FBBF24_0%,#21283C_50%,#FBBF24_100%)]': style === 'yellow',
            'bg-[conic-gradient(from_90deg_at_50%_50%,#2b79d9_0%,#21283C_50%,#2b79d9_100%)]': style === 'blue',
            'bg-[conic-gradient(from_90deg_at_50%_50%,#222426_0%,#ffffff_50%,#222426_100%)]': style === 'black',
            'bg-[conic-gradient(from_90deg_at_50%_50%,#a10a2f_0%,#FBBF24_50%,#a10a2f_100%)]': style === 'red',
            'bg-[conic-gradient(from_90deg_at_50%_50%,#222426_0%,#63e_50%,#222426_100%)]': style === 'purple',
          })}
      ></span>
      <div className="bg-gray-950 gap-2 inline-flex items-center justify-center w-full px-4 py-2 text-lg rounded-full cursor-pointer backdrop-blur-3xl whitespace-nowrap">
        {children}
      </div>
    </span>
  )
}