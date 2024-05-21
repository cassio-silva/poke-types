import { Navbar } from 'components/Navbar';
import { ReactNode, Suspense } from 'react';
import { Metadata } from 'next';
import '../styles/global.css';
import { roboto, poppins, garamond, barlow } from 'fonts/loader';
import { ButtonBackToTop } from 'components/global/BackToTopButton';
import PokemonLoading from './pokemon/loading';

export const metadata: Metadata = {
  title: 'Poketools',
  description: 'Your pokémonGo Tools',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-br"
      className={`${roboto.variable} ${garamond.variable} ${barlow.variable} ${poppins.variable}`}
    >
      <body className="flex flex-col font-poppins bg-fixed bg-teal-300 bg-gradient-to-t from-teal-200 from-50% to-lime-100 to-100%">
        <Navbar />
        <main className="w-full flex flex-col gap-8 lg:gap-12 mt-0 lg:mt-20 mb-16 lg:mb-0 pb-14 lg:pb-0">
          {children}
          <ButtonBackToTop />
        </main>
      </body>
    </html>
  );
}
