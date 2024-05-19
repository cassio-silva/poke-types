import { Roboto, Poppins, EB_Garamond, Barlow } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-roboto',
  preload: true,
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-poppins',
  preload: true,
  display: 'swap',
});

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-garamond',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-barlow',
  display: 'swap',
});

export { roboto, poppins, garamond, barlow };
