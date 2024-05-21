import { PokemonCards } from 'components/PokemonCards';
import { PokemonProps } from 'entities/Pokemon';

async function getPokemonByType(
  type1: string,
  type2?: string
): Promise<PokemonProps[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/type?type1=${type1}${
      !!type2 ? `&type2=${type2}` : ''
    }`
  );
  const pokemonData = await res.json();

  return pokemonData.data;
}

export const revalidate = 300;

export default async function PokemonTypes({
  params,
}: {
  params: {
    types: Array<string>;
  };
}) {
  const type1 = params.types[0];
  const type2 = params?.types[1];
  const pokemonData = await getPokemonByType(type1, type2);

  return (
    <PokemonCards
      pokemon={pokemonData}
      hasFilterNotFoundPokemon={pokemonData.length < 1}
    />
  );
}
