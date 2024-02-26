'use client'

import React from 'react'

import { withAuth } from '../_auth/components/with-auth'

const Layout = ({
  children,
}: {
	children: React.ReactNode;
}) => {
  console.log('render...')

  return (
    <div className="min-h-screen relative flex flex-col items-start justify-between overflow-y-auto bg-background">
      {children}
    </div>
  )
}


export default withAuth(Layout)

