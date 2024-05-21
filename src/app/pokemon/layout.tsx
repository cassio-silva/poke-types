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
    types: Array<string>;
  };
}) {
  return (
    <>
      <Heading>
        Pokémon by <br />
        Types
      </Heading>

      <PokemonTypeSelector params={params} />

      <Suspense fallback={<PokemonLoading />}>
        <article className="flex flex-col w-full gap-2 mx-auto">
          {children}
        </article>
      </Suspense>
    </>
  );
}
