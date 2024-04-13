'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/_shared/components/ui/dialog'

interface Props {
    title: string
    children: React.ReactNode
}

export const IntercepModal = ({ title, children }: Props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true) 

  const onOpenChangeHandler = (value: boolean) => {
    if (!value) {
      setIsOpen(false)
      router.back()

      return
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChangeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
