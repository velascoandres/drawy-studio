import { DM_Sans } from 'next/font/google'

import { TRPCReactProvider } from '@/trpc/react'

import { AuthProvider } from './_auth/components/auth-provider'
import { ModalContainer } from './_shared/components/modal/modal-container'
import { ThemeProvider } from './_shared/components/theme/theme-provider'
import { Toaster } from './_shared/components/ui/toaster'

import '@/styles/globals.css'

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  metadataBase: new URL('https://drawy-studio.vercel.app'),
  title: 'Drawy studio',
  description: 'Drawy is a whiteboard cloud manager solution',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'Drawy a cloud based manager whiteboard solution',
    description: 'Drawy is an innovative cloud-based whiteboard management solution that stands out for its integration with the popular Excalidraw tool',
    url: 'https://drawy-studio.vercel.app/',
    siteName: 'Drawy studio',
    images: [
      {
        url: 'https://drawy-studio.vercel.app/whiteboard.jpg',
        width: 1200,
        height: 630,
      }
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${dm_sans.variable}`}>
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
