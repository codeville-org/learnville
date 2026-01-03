import { DM_Sans, DM_Mono, Bricolage_Grotesque } from 'next/font/google'
import { cn } from './utils'

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
})

export const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
})

export const fontClass = cn(
  `${dmSans.variable} ${dmMono.variable} ${bricolageGrotesque.variable} font-sans antialiased`,
)
