'use client';

import { useEffect, useState } from 'react';
import { PokemonCards } from 'components/PokemonCards';
import { Pagination } from 'components/Pagination';
import { Heading } from 'components/global/Heading';
import { ButtonClose } from 'components/global/ButtonClose';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PokemonProps, PokemonResponseProps } from 'entities/Pokemon';
import { api } from 'services/api';
import Image from 'next/image';
// JSON
import types from 'json/types.json';

async function getPokemonData(
  itemsPerPage: number,
  offset: number
): Promise<PokemonResponseProps> {
  const res = await api.get(
    `/api/pokemon?limit=${itemsPerPage}&offset=${offset}`
  );
  const data = res.data;

  return {
    data: data.data,
    next: data.next,
    previous: data.previous,
  };
}

async function getPokemonByTypes(
  type1: string,
  type2: string
): Promise<PokemonProps[] | undefined> {
  if (!type1) {
    return;
  }
  const res = await api.get(
    `/api/type?type1=${type1}${!!type2 ? `&type2=${type2}` : ''}`
  );
  const pokemonData = res.data;

  return pokemonData.data;
}

export const revalidate = 300;

export default function Pokemon() {
  const [selectedTypes, setSelectedTypes] = useState<[string, string]>([
    '',
    '',
  ]);
  const [pokemon, setPokemon] = useState<PokemonResponseProps>({
    data: [],
    next: '',
    previous: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const getNumberRegex = /\d+/g;
  const itemsPerPage = 48;

  async function handlePokemonByTypes() {
    setIsLoading(true);
    const pokeRes = await getPokemonByTypes(selectedTypes[0], selectedTypes[1]);

    setPokemon({
      data: pokeRes!,
      next: '',
      previous: '',
    });
    setIsLoading(false);
  }

  function handleTypeSelection(type: string) {
    if (!selectedTypes[0] || (!!selectedTypes[0] && !!selectedTypes[1])) {
      setSelectedTypes([type, '']);
    }
    if (!!selectedTypes[0] && !selectedTypes[1]) {
      setSelectedTypes([selectedTypes[0], type]);
    }
    if (selectedTypes[0] === type || selectedTypes[1] === type) {
      resetTypes();
    }
  }

  function resetTypes() {
    setSelectedTypes(['', '']);
  }

  async function loadPokemon(offset: number) {
    try {
      setIsLoading(true);
      const pokemon = await getPokemonData(itemsPerPage, offset);
      setPokemon(pokemon);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  async function loadNextPage() {
    if (!!pokemon.next && !isLoading) {
      // Gets the offset number from the "next" string
      const nextPageOffset = Number(pokemon.next?.match(getNumberRegex)?.[1]);
      loadPokemon(nextPageOffset).then(() => setcurrentPage(currentPage + 1));
    }
  }

  async function loadPreviousPage() {
    if (!!pokemon.previous && currentPage > 1 && !isLoading) {
      const previousPageOffset = Number(
        pokemon.previous?.match(getNumberRegex)?.[1]
      );
      loadPokemon(previousPageOffset).then(() =>
        setcurrentPage(currentPage - 1)
      );
    }
  }

  function handleToggleFilterVisible() {
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    if (selectedTypes[0] || selectedTypes[1]) {
      handlePokemonByTypes();
    } else {
      loadPokemon(0);
    }
  }, [selectedTypes]);

  useEffect(() => {
    loadPokemon(0);
    setcurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Heading>
        Pokémon by <br />
        Types
      </Heading>

      <article className="flex flex-col w-full gap-2 mx-auto">
        {/* filter button */}
        <button
          className="flex gap-2 items-center justify-center font-barlow w-fit mx-auto text-base text-white px-2 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md hover:brightness-90"
          onClick={handleToggleFilterVisible}
        >
          Types
          <ChevronDownIcon
            className={`w-5 transition ${
              isVisible ? 'transform -rotate-180' : ''
            }`}
          />
        </button>
        {/* Type buttons */}
        <div
          data-expanded={isVisible}
          className={`w-fit h-fit max-h-0 grid grid-cols-[repeat(6,auto)] lg:grid-cols-9 overflow-hidden place-items-center gap-1 mx-auto  
            transition-all data-[expanded=true]:max-h-[300px] data-[expanded=true]:p-4 data-[expanded=true]:pt-6`}
        >
          {types.map((type) => (
            <button
              className={
                'group flex items-center justify-center relative w-[52px] h-[52px] lg:w-16 lg:h-16 bg-white rounded-full p-1 filter brightness-75 transition hover:brightness-100 aria-expanded:brightness-100 aria-expanded:shadow-[0_0_12px_3px_rgba(255,255,255,1)]'
              }
              key={type.typeLabel.en}
              aria-expanded={
                selectedTypes[0] === type.typeLabel.en ||
                selectedTypes[1] === type.typeLabel.en
              }
              onClick={() => handleTypeSelection(type.typeLabel.en)}
            >
              <Image
                width={200}
                height={200}
                src={`/${type.img}`}
                alt={type.typeLabel.en}
              />
              {/* tooltip */}
              <span
                className={`hidden group-hover:block absolute -top-5 font-barlow text-sm text-white bg-gray-300 px-3 leading-5 rounded-full capitalize transition-opacity opacity-0 group-hover:opacity-100`}
              >
                {type.typeLabel.en}
              </span>
            </button>
          ))}
        </div>
        <ButtonClose
          onClick={resetTypes}
          disabled={Boolean(!selectedTypes[0] && !selectedTypes[1])}
        />
      </article>

      {isLoading ? (
        <Image
          width={100}
          height={100}
          src="/spinner.png"
          className="mx-auto mt-12 animate-spin"
          alt=""
        />
      ) : (
        <PokemonCards
          pokemon={pokemon.data}
          hasFilterNotFoundPokemon={
            !isLoading && pokemon.data.length < 1 && Boolean(selectedTypes[0])
          }
        />
      )}

      <div className="pb-9">
        {!selectedTypes[0] && (
          <Pagination
            currentPage={currentPage}
            getNextPage={loadNextPage}
            getPreviousPage={loadPreviousPage}
          />
        )}
      </div>
    </>
  );
}
