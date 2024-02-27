import { Inter } from 'next/font/google'

import { TRPCReactProvider } from '@/trpc/react'

import { AuthProvider } from './_auth/components/auth-provider'
import { ModalContainer } from './_shared/components/modal/modal-container'
import { ThemeProvider } from './_shared/components/theme/theme-provider'
import { Toaster } from './_shared/components/ui/toaster'

import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Drawy studio',
  description: 'Drawy is a whiteboard cloud manager solution',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <div className="absolute inset-0 -z-10 h-min-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <TRPCReactProvider>
              <ModalContainer />
              <Toaster />
              {children}
            </TRPCReactProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
