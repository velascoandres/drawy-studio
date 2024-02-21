'use client'

import React from 'react'

import { withAuth } from '../_auth/components/with-auth'
import { Navbar } from '../_shared/components/navigation/navbar'

const Layout = ({
  children,
}: {
	children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen relative flex flex-col items-start justify-between overflow-y-auto bg-background">
      <Navbar />
      <div className="w-full mt-[62px]">
        {children}
      </div>
    </div>
  )
}


export default withAuth(Layout)

