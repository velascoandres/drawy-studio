import React from 'react'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/" className="hidden md:block md:mb-5 px-6 text-2xl font-semibold whitespace-nowrap text-primary">
      <strong className="font-bold italic text-[#63e]">Drawy</strong> Studio
    </Link>
  )
}
