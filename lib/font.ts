import { Poppins as Poppin,  Space_Grotesk, Fira_Code } from 'next/font/google'

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
export const FiraCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-FiraCode',
  preload: true,
})
