import { type Metadata } from 'next'
import {ClerkProvider} from '@clerk/nextjs'
import {Manrope} from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import { dark } from '@clerk/themes'
import { Toaster } from '@/components/ui/sonner'


const manrope = Manrope({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Opinion",
  description: "Say it. Anonymously.",
  openGraph: {
    title: "Opinion",
    description: "Say it. Anonymously.",
    url: "https://send-opinion.vercel.app",
    siteName: "Opinion",
    images: [
      {
        url: "https://send-opinion.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Opinion : Anonymous Feedbacks",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opinion",
    description: "Say it. Anonymously.",
    images: ["https://send-opinion.vercel.app/opengraph-image.png"],
  },
};

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