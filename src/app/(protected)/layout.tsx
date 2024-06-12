'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { NAVIGATION } from '@/constants/navigation'
import { DEFAULT_SPACE } from '@/constants/spaces'

import { withAuth } from '../_auth/components/with-auth'
import { useWorkspaceStore } from '../_shared/store/workspace-store'

const Layout = ({
  children,
}: {
	children: React.ReactNode;
}) => {
  const { currentSpace } = useWorkspaceStore()
  const router = useRouter()

  useEffect(() => {
    if (!currentSpace){
      return router.push(`${NAVIGATION.SPACES.path}/${DEFAULT_SPACE}`)
    }

    router.push(`${NAVIGATION.SPACES.path}/${currentSpace.id}`)

    return

  }, [currentSpace, router])

  return (
    <div className="min-h-screen relative flex flex-col items-start justify-between overflow-y-auto bg-background">
      {children}
    </div>
  )
}


export default withAuth(Layout)

