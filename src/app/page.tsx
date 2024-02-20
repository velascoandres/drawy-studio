import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { getServerAuthSession } from '@/server/auth'

import { SigninProviders } from './_auth/components/sign-in-providers'
import { AnimatedBagde } from './_shared/components/ui/animated-bagde'

export default async function Home() {
  noStore()

  const session = await getServerAuthSession()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to <span className="text-[hsl(280,100%,70%)]">Drawy</span> Studio
        </h1>

        {
          session ? (
            <Link
              href="/dashboard"
              className="flex items-center transition ease-in group rounded-full text-white pl-4 pr-2 py-3 font-semibold no-underline "
            >
              <AnimatedBagde>
                <span className="group-hover:text-amber-400">Continue to dashboard </span>
                <ChevronRight className="transition ease-out duration-200 group-hover:translate-x-1 group-hover:text-amber-400" />
              </AnimatedBagde>
            </Link>) : (
            <SigninProviders />
          )
        }
      </div>
    </main>
  )
}

