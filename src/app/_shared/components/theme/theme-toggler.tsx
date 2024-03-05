'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { Moon,Sun } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

export const ThemeToggler = () => {
  const { setTheme, theme } = useTheme()

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }   


  return (
    <Button onClick={changeTheme} variant="ghost">
      <Moon className={cn('hidden', {
        'block': theme === 'dark'
      })} />
      <Sun className={cn('hidden', {
        'block': theme === 'light'
      })} />
    </Button>
  )
}
