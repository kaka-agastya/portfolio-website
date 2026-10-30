import { Inter as InterFont, Space_Grotesk, Geist_Mono } from 'next/font/google'

export const Inter = InterFont({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-Inter',
  preload: true,
})

export const Space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-Space',
  preload: true,
})

export const GeistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-GeistMono',
  preload: true,
})
