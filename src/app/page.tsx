import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { FEATURES } from '@/constants/features'
import { getServerAuthSession } from '@/server/auth'

import { SigninProviders } from './_auth/components/sign-in-providers'
import { AnimatedBagde } from './_shared/components/ui/animated-bagde'
import { Card, CardDescription, CardHeader, CardTitle } from './_shared/components/ui/card'

export default async function Home() {
  noStore()

  const session = await getServerAuthSession()
  
  return (
    <>
      <div className="fixed -z-[1] min-h-screen w-full bg-background"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div></div>
      <main className="flex flex-col items-center justify-center text-white min-h-screen gap-4">
  
        <section className="flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-primary">
      Welcome to <strong className="italic text-[#63e] font-bold">Drawy</strong> Studio
          </h1>

          <p className="max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[850px] text-primary text-lg/relaxed md:text-xl/relaxed dark:text-gray-400 [&>strong]:font-bold [&>strong]:text-[#63e]">
      Drawy is an innovative cloud-based whiteboard management solution that stands out for its integration with the popular <strong>Excalidraw</strong> tool.
          </p>

          {
            session ? (
              <Link
                href="/whiteboards"
                className="flex items-center transition ease-in group rounded-full text-white pl-4 pr-2 py-3 font-semibold no-underline "
              >
                <AnimatedBagde style="purple">
                  <span className="transition ease-in group-hover:text-white dark:group-hover:text-[#63e]">Continue to dashboard </span>
                  <ChevronRight className="transition ease-out duration-200 group-hover:translate-x-1 group-hover:text-white dark:group-hover:text-[#63e]" />
                </AnimatedBagde>
              </Link>) : (
              <SigninProviders />
            )
          }

        </section>


        <section className="flex flex-row flex-wrap items-center justify-center gap-3">
          {
            FEATURES.map(({ icon, title, description }, index) => (

              <Card key={`feat-${index}`} className="relative backdrop-blur-sm bg-background/50 w-[350px] md:w-[300px] group rounded-lg transition ease-in hover:scale-105 border-border p-2 cursor-pointer dark:hover:bg-gradient-to-br from-black to-indigo-950 hover:border-indigo-400">
                <CardHeader className="flex flex-col gap-2 items-center">
                  <div className="group-hover:text-[#63e]">
                    {icon}
                  </div>
                  <CardTitle className="transition ease-out duration-200 group-hover:text-primary/45 text-xl font-bold self-center text-gray-400">
                    {title}
                  </CardTitle>
                  <CardDescription className="transition ease-out duration-200 dark:group-hover:text-gray-200 text-base/relaxed text-gray-400">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          }
        </section>
      </main>
    </>
  )
}

