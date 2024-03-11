import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {twMerge} from "tailwind-merge";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brand Kit',
  description: 'Search everywhere for your next brand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={twMerge(inter.className, 'flex', 'h-full', 'w-screen')}>
        {children}
        <Analytics/>
      </body>
    </html>
  )
}
