'use client'

import { Suspense, useEffect, useState } from 'react'
import { PokemonCards } from 'components/PokemonCards'
import { Pagination } from 'components/Pagination'
import { PokemonProps } from 'entities/Pokemon'
import { Heading } from 'components/global/Heading'
// JSON
import types from 'json/types.json'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ButtonClose } from 'components/global/ButtonClose'
import { MessageWarning } from 'components/global/MessageWarning'

interface PokemonDataProps {
  data: PokemonProps[]
  next: string
  previous: string
}

async function getPokemonData(
  endpoint: string
): Promise<PokemonDataProps> {
  const res = await fetch(`/api/pokemon?${endpoint}`, {
    next: {
      revalidate: 300,
    },
    cache: 'force-cache',
  })
  const data = await res?.json()

  return {
    data: data.data,
    next: data.next,
    previous: data.previous,
  }
}

export default function Pokemon() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['', ''])
  const [pokemon, setPokemon] = useState<PokemonDataProps>({
    data: [],
    next: '',
    previous: '',
  })
  const [filteredPokemon, setFilteredPokemon] = useState<
    PokemonProps[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setcurrentPage] = useState(1)
  const [isVisible, setIsVisible] = useState(true)
  const itemsPerPage = 24

  function filterByType() {
    try {
      const pokemonFiltered = pokemon.data.filter((poke) => {
        if (
          poke.types.some((pokeType) =>
            pokeType.type.name.startsWith(selectedTypes[0])
          ) &&
          poke.types.some((pokeType) =>
            pokeType.type.name.startsWith(selectedTypes[1])
          )
        ) {
          return poke
        }
        return false
      })
      const pokemonOrdered = pokemonFiltered.sort((pokeA, pokeB) =>
        pokeA.id > pokeB.id ? 1 : -1
      )

      setFilteredPokemon(pokemonOrdered)
    } catch (err) {
      console.error(err)
    }
  }

  function handleTypeSelection(type: string) {
    if (
      !selectedTypes[0] ||
      (!!selectedTypes[0] && !!selectedTypes[1])
    ) {
      setSelectedTypes([type, ''])
    }
    if (!!selectedTypes[0] && !selectedTypes[1]) {
      setSelectedTypes([selectedTypes[0], type])
    }
    if (selectedTypes[0] === type || selectedTypes[1] === type) {
      resetTypes()
    }
  }

  function resetTypes() {
    setSelectedTypes(['', ''])
  }

  async function loadPokemon(endpoint: string) {
    try {
      setIsLoading(true)
      const pokemon = await getPokemonData(endpoint)
      setPokemon(pokemon)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      setIsLoading(false)
    }
  }

  async function loadNextPage() {
    if (!!pokemon.next && !isLoading) {
      loadPokemon(pokemon.next?.split('/v2/pokemon?')[1]).then(() =>
        setcurrentPage(currentPage + 1)
      )
    }
  }

  async function loadPreviousPage() {
    if (!!pokemon.previous && currentPage > 1 && !isLoading) {
      loadPokemon(pokemon.previous?.split('/v2/pokemon?')[1]).then(() =>
        setcurrentPage(currentPage - 1)
      )
    }
  }

  function handleToggleFilterVisible() {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    filterByType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypes, pokemon.data])

  useEffect(() => {
    loadPokemon(`limit=${itemsPerPage}&offset=0`)
    setcurrentPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      <Pagination
        currentPage={currentPage}
        getNextPage={loadNextPage}
        getPreviousPage={loadPreviousPage}
      />

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
          pokemon={filteredPokemon}
          hasFilterNotFoundPokemon={
            !isLoading &&
            filteredPokemon.length < 1 &&
            Boolean(selectedTypes[0])
          }
        />
      )}
    </>
  )
}
