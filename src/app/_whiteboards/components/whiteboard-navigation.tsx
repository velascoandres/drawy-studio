import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { ProfileCard } from '@/app/_auth/components/profile-card'

export const WhiteboardNavigation = () => {
  return (
    <nav className="z-20 fixed inline-flex items-center justify-between bottom-4 right-[30%] left-[30%] bg-background rounded-full px-2 py-1">
      <Link href="/whiteboards" className="hover:text-indigo-600 inline-flex items-center  justify-start">
        <ArrowLeft />
         Go back
      </Link>

      <ProfileCard /> 
    </nav>
  )
}
