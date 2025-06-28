import { type Metadata } from 'next'
import {ClerkProvider} from '@clerk/nextjs'
import {Manrope} from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import { dark } from '@clerk/themes'

const manrope = Manrope({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Opnion',
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
        <body className={`${manrope.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>

        </body>
      </ClerkProvider>
      </html>

  )
}