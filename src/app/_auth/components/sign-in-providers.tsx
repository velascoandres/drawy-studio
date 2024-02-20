'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'

import { AnimatedBagde } from '@/app/_shared/components/ui/animated-bagde'


const CONFIG = { callbackUrl: '/whiteboards' }

export const SigninProviders = () => {

  return (
    <div className="flex flex-row justify-center flex-wrap items-center gap-4">
      <AnimatedBagde
        style="black"
        role="button"
        className="transition ease-in text-white hover:scale-105"
        onClick={() => signIn('github', CONFIG)}
      >
        <Github className="mx-2" />
            Continue with Github
      </AnimatedBagde>
    </div>
  )
}