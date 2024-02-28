import React from 'react'
import Link from 'next/link'
import { Coffee,Github } from 'lucide-react'

import { LINKS } from '@/constants/links'

import { AnimatedBagde } from '../ui/animated-bagde'

export const ContactLinks = () => {
  return (
    <section className="flex flex-row flex-wrap items-center gap-2 justify-center">
      <Link href={LINKS.GITHIB_REPOSITORY} target="_blank" className="transition ease-in rounded-full inline-flex justify-center items-center px-3 py-2 hover:scale-105">
        <AnimatedBagde style="black" className="p-[1.5px]">
          <Github />
          <span>Github</span>
        </AnimatedBagde>
      </Link>  
      <Link href={LINKS.BUY_ME_COFEE} target="_blank" className="transition ease-in rounded-full inline-flex justify-center items-center px-3 py-2 hover:scale-105">
        <AnimatedBagde style="black" fill="yellow" className="p-[1.5px]">
          <Coffee className="text-neutral-800" />
          <span className="text-neutral-800">Buy me a coffee</span>
        </AnimatedBagde>
      </Link>
    </section>
  )
}
