import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { ProfileCard } from '@/app/_auth/components/profile-card'
import { Button } from '@/app/_shared/components/ui/button'

interface Props {
  whiteboardName: string
}


export const WhiteboardNavigation = ({ whiteboardName }: Props) => {
  const router = useRouter()

  const handleGoback = () => {
    router.back()
  }

  return (
    <nav className="z-20 fixed inline-flex items-center justify-between bottom-4 right-[30%] left-[30%] bg-background rounded-full px-2 py-1">
      <Button variant="ghost"  onClick={handleGoback} className="hover:text-primary/70 inline-flex items-center justify-start rounded-full rounded-full">
        <ArrowLeft />
      </Button>

      <h1 className="font-bold max-w-xs text-ellipsis">{whiteboardName}</h1>

      <ProfileCard /> 
    </nav>
  )
}
