'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { Moon,Sun } from 'lucide-react'

import { Button } from '../ui/button'

export const ThemeToggler = () => {
  const { setTheme, theme } = useTheme()

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }   


  return (
    <Button onClick={changeTheme} variant="ghost">
      {
        theme === 'dark' ? <Moon /> : <Sun />
      }
    </Button>
  )
}
