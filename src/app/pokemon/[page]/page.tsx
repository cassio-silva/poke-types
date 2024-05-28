import { PaginationWithLink } from 'components/Pagination/PaginationWithLink';
import { PokemonCards } from 'components/PokemonCards';
import { PokemonListProps, PokemonProps } from 'entities/Pokemon';
import PokemonSkeletonLoading from '../loading';

export const revalidate = 300;

export default async function PokemonPage({
  params,
}: {
  params: { page: string };
}) {
  const itemsPerPage = 48;
  const currentPage = Number(params.page) < 1 ? 1 : Number(params.page);
  const pokemonData = await GetPokemon(params.page, itemsPerPage);

  return (
    <>
      <PaginationWithLink currentPage={currentPage} />

      <PokemonCards pokemon={pokemonData.data} />

      <PaginationWithLink currentPage={currentPage} />
    </>
  );
}

async function GetPokemon(
  page: string,
  itemsPerPage: number
): Promise<{
  data: PokemonProps[];
  next: string;
  previous: string;
}> {
  const currentPage = Number(page);
  const offset = (currentPage - 1) * itemsPerPage;
  const response: PokemonListProps = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`,
    {
      method: 'GET',
      next: {
        revalidate: 300,
      },
    }
  ).then((res) => res.json());

  const pokemonData = response.results;

  const pokemonDataDetailed = pokemonData.map(async (poke) => {
    const _pokeData: PokemonProps = await fetch(poke.url).then((res) =>
      res.json()
    );
    return _pokeData;
  });
  const pokemonFullData = await Promise.all(pokemonDataDetailed);
  const pokemonDataReady = pokemonFullData.map((_poke) => {
    return {
      id: _poke.id,
      name: _poke.name,
      sprites: _poke.sprites,
      types: _poke.types,
    };
  });

  return {
    data: pokemonDataReady,
    next: response.next,
    previous: response.previous,
  };
}
