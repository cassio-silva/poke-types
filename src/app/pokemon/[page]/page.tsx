import { PaginationWithLink } from 'components/Pagination/PaginationWithLink';
import { PokemonCards } from 'components/PokemonCards';
import { PokemonProps } from 'entities/Pokemon';

async function GetPokemon(
  page: string,
  itemsPerPage: number
): Promise<PokemonProps[]> {
  const currentPage = Number(page);
  const offset = (currentPage - 1) * itemsPerPage;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/pokemon?limit=${itemsPerPage}&offset=${offset}`
  );
  const pokemonData = await res.json();

  return pokemonData.data;
}

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

      <PokemonCards
        pokemon={pokemonData}
        hasFilterNotFoundPokemon={pokemonData.length < 1}
      />

      <PaginationWithLink currentPage={currentPage} />
    </>
  );
}
