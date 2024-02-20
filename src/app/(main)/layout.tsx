'use client'

import React from 'react'

import { withAuth } from '../_auth/components/with-auth'

const Layout = ({
  children,
}: {
	children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen relative flex flex-col items-start justify-between overflow-y-auto">
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}


export default withAuth(Layout)

