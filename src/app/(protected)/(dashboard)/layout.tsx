import React from 'react'

import { SideNavigation } from '@/app/_shared/components/navigation/sidebar'

const LayoutPage = ({
  children,
  modal
}: {children: React.ReactNode, modal: React.ReactNode}) => {
  return (
    <div className="min-h-screen relative flex flex-col items-start justify-between overflow-y-auto w-full">
      <SideNavigation />
      <div className="md:pl-[200px] w-full">
        {children}
        {modal}
      </div>
    </div>
  )
}

export default LayoutPage