import { Poppins as Poppin, JetBrains_Mono,  Space_Grotesk } from 'next/font/google'

export const Poppins = Poppin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-Poppins',
  preload: true,
})

export const Space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-Space',
  preload: true,
})
export const JetBrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-JetBrains',
  preload: true,
})
