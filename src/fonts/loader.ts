import { Roboto, Poppins, EB_Garamond, Barlow } from "next/font/google"

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-roboto',
  preload: true,
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-poppins',
})

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400','600','700','800'],
  variable: '--font-garamond',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400','600','800'],
  variable: '--font-barlow',
})

export {
  roboto,
  poppins,
  garamond,
  barlow
}