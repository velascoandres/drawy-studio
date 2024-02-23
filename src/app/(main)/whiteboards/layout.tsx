'use client'

import React from 'react'

export const Layout = ({
  children,
}: {
      children: React.ReactNode;
  }) => {
  return (
    <div className="h-[calc(100dvh-62px)] px-3">
      {children}
    </div>
  )
}


export default Layout