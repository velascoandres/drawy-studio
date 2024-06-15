import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import { Coffee, Github } from 'lucide-react'

import { FEATURES } from '@/constants/features'
import { LINKS } from '@/constants/links'
import { getServerAuthSession } from '@/server/auth'

import { ContinueDashboardButton, SigninProviders } from './_auth/components/sign-in-providers'
import { FeatCard } from './_shared/components/ui/feat-card'

export default async function Home() {
  noStore()

  const session = await getServerAuthSession()
  
  return (
    <>
      <div className="galaxy">
        <div className="stars1"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <main className="flex flex-col items-center justify-center text-white min-h-screen gap-4 bg-black">
        <div className="invisible md:visible fixed top-1 right-1 text-black">
          <div className="inline-flex gap-2">
            <ul className="inline-flex text-sm list-none">
              <li className="relative flex items-center w-full">
                <Link href={LINKS.GITHIB_REPOSITORY} 
                  className="transition ease-in rounded-full text-white hover:bg-white hover:text-black p-3"
                >
                  <Github />
                </Link>
              </li>

              <li className="relative flex items-center w-full">
                <Link href={LINKS.BUY_ME_COFEE} 
                  className="transition ease-in rounded-full hover:bg-white p-3"
                >
                  <Coffee className="text-amber-400" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <section className="flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-white">
      Welcome to <strong className="italic text-[#63e] font-bold">Drawy</strong> Studio
          </h1>

          <p className="max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[850px] text-lg/relaxed md:text-xl/relaxed text-gray-400 [&>strong]:font-bold [&>strong]:text-[#63e]">
      Drawy is an innovative cloud-based whiteboard management solution that stands out for its integration with the popular <strong>Excalidraw</strong> tool.
          </p>

          {
            session ? <ContinueDashboardButton /> : <SigninProviders />
          }

        </section>
        <section className="flex flex-row flex-wrap items-center justify-center gap-3">
          {
            FEATURES.map(({ icon, title, description }, index) => (
              <FeatCard key={`feat-${index}`}  icon={icon} title={title} description={description} />
            ))
          }
        </section>
      </main>
    </>
  )
}

