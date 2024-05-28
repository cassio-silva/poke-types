import { Heading } from 'components/global/Heading';
import { ReactNode, Suspense } from 'react';
import PokemonLoading from './loading';
import { PokemonTypeSelector } from 'components/PokemonTypeSelector';

export default function PokemonLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    types?: Array<string>;
  };
}) {
  return (
    <>
      <Heading>
        Pokémon by <br />
        Types
      </Heading>

      <PokemonTypeSelector />

      <Suspense fallback={<PokemonLoading />}>
        <section className="flex flex-col w-full gap-3 mx-auto">
          {children}
        </section>
      </Suspense>
    </>
  );
}
