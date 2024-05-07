'use client'

import React from 'react'
import { AppProgressBar as NProgressBar } from 'next-nprogress-bar'

export const NavigationProgress = () => {
  return (
    <NProgressBar
      color="#63e"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}