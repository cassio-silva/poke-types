import { PokemonCards } from 'components/PokemonCards';
import { PokemonProps } from 'entities/Pokemon';

type PokemonTypeData = {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
};

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
    <section className="mt-16">
      <PokemonCards pokemon={pokemonData} />
    </section>
  );
}

async function getPokemonByType(
  type1: string,
  type2?: string
): Promise<PokemonProps[]> {
  let type2Response = null;

  const type1Response = await fetch(`https://pokeapi.co/api/v2/type/${type1}`);

  if (!!type2) {
    type2Response = await fetch(`https://pokeapi.co/api/v2/type/${type2}`);
  }

  const dataType1: PokemonTypeData[] = await type1Response
    .json()
    .then((res) => res.pokemon);

  const dataType2: PokemonTypeData[] = await type2Response
    ?.json()
    .then((res) => res.pokemon);

  if (!dataType2) {
    const pokemonType1Data = dataType1.map(async (poke) => {
      const _res = await fetch(poke.pokemon.url, {
        next: {
          tags: ['pokemon-list', type1],
        },
      });
      const _poke: PokemonProps = await _res.json();

      return {
        id: _poke.id,
        name: _poke.name,
        sprites: {
          front_default: _poke.sprites.front_default,
          back_default: _poke.sprites.back_default,
        },
        types: _poke.types,
      };
    });
    const pokemonDataReady = await Promise.all(pokemonType1Data);

    return pokemonDataReady;
  }

  const pokemonTypeIntersection = dataTypeIntersection(dataType1, dataType2);
  const pokemonData = pokemonTypeIntersection.map(async (poke) => {
    const _res = await fetch(poke.pokemon.url);
    const _poke = await _res.json();

    return {
      id: _poke.id,
      name: _poke.name,
      sprites: {
        front_default: _poke.sprites.front_default,
        back_default: _poke.sprites.back_default,
      },
      types: _poke.types,
    };
  });

  const pokemonDataReady: PokemonProps[] = await Promise.all(pokemonData);

  return pokemonDataReady;
}

function dataTypeIntersection(
  array1: Array<PokemonTypeData>,
  array2: Array<PokemonTypeData>
): Array<PokemonTypeData> {
  const typeInstersection = array1.filter((pokeType1) =>
    array2.some(
      (pokeType2) => pokeType1.pokemon.name === pokeType2.pokemon.name
    )
  );

  return typeInstersection;
}
