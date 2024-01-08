import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {twMerge} from "tailwind-merge";

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
      <body className={twMerge(inter.className, 'h-full')}>{children}</body>
    </html>
  )
}
