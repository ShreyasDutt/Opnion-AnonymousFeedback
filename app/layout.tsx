import { type Metadata } from 'next'
import {ClerkProvider} from '@clerk/nextjs'
import {Manrope} from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import { dark } from '@clerk/themes'
import { Toaster } from '@/components/ui/sonner'


const manrope = Manrope({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Opinion',
  description: 'Say it. Anonymously.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}      
      >
        <body className={`${manrope.className} antialiased scroll-smooth`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position='top-right' richColors/>
          </ThemeProvider>

        </body>
      </ClerkProvider>
      </html>

  )
}