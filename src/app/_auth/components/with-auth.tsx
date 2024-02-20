/* eslint-disable react/display-name */
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { LoadingPage } from '@/app/_shared/components/ui/loading-page'


type PageProps = {
	children: React.ReactNode;
}

type PageComponent = (props: PageProps) => React.ReactNode

export const withAuth = (Page: PageComponent) => {

  return ({ children }: PageProps) => {
    const { status } = useSession()
    const router = useRouter()

    const [isAllowed, setIsAllowed] = useState(false)

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/')

        return
      }

      if (status === 'authenticated') {
        setIsAllowed(true)
      }

    }, [router, status])

    if (!isAllowed) {
      return <LoadingPage />
    }


    return (
      <Page >
        {children}
      </Page>
    )
  }
}