import type { Metadata } from 'next'
import { Noto_Sans, Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const notoSans = Noto_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Open Face Site',
  description: 'Created with v0',
  icons: {
    icon: '/images/openface.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} ${montserrat.className}`}>{children}</body>
    </html>
  )
}
