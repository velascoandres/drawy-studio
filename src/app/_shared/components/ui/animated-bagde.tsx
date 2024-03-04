import React from 'react'
import { cva,type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

interface Props extends VariantProps<typeof containerVariants>, VariantProps<typeof innerContainerVariants>{
    children: React.ReactNode | React.ReactNode[]
    role?: string
    className?: string
    onClick?: () => void
}

const containerVariants = cva(
  'absolute inset-[-1000%] animate-[spin_2s_linear_infinite]',
  {
    variants: {
      style: {
        yellow: 'bg-[conic-gradient(from_90deg_at_50%_50%,#FBBF24_0%,#21283C_50%,#FBBF24_100%)]',
        blue:
          'bg-[conic-gradient(from_90deg_at_50%_50%,#2b79d9_0%,#21283C_50%,#2b79d9_100%)]',
        black:
          'bg-[conic-gradient(from_90deg_at_50%_50%,#222426_0%,#ffffff_50%,#222426_100%)]',
        red:
          'bg-[conic-gradient(from_90deg_at_50%_50%,#a10a2f_0%,#FBBF24_50%,#a10a2f_100%)]',
        purple: 'bg-[conic-gradient(from_90deg_at_50%_50%,#222426_0%,#63e_50%,#222426_100%)]',
      },
    },
    defaultVariants: {
      style: 'black',
    },
  }
)

const innerContainerVariants = cva(
  'gap-2 inline-flex items-center justify-center w-full px-4 py-2 text-lg rounded-full cursor-pointer backdrop-blur-3xl whitespace-nowrap',
  {
    variants: {
      fill: {
        yellow: 'bg-yellow-300/60',
        blue: 'bg-blue-300',
        black: 'bg-gray-black/50 dark:bg-black',
        red: 'bg-red-300',
        purple: 'bg-purple-300',
      },
    },
    defaultVariants: {
      fill: 'black',
    },
  }
)


export const AnimatedBagde = ({
  children,
  role='',
  className='',
  style,
  fill,
  onClick
}: Props) => {
  return (
    <span role={role} onClick={onClick}  className={`relative inline-flex overflow-hidden rounded-full p-[1px] text-white/80 ${className}`}>
      <span
        className={cn(containerVariants({ style }))}
      ></span>
      <div className={cn(innerContainerVariants({ fill }))}>
        {children}
      </div>
    </span>
  )
}