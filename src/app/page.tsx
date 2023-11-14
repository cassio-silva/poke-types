'use client'

import { SearchInput } from 'components/SearchInput'
import { TypeComponentCard } from 'components/TypeComponent'
import { useState } from 'react'
import { Heading } from 'components/global/Heading'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { TypeAdvantages } from 'entities/PokemonTypes'

import types from '../json/types.json'
import { ButtonClose } from 'components/global/ButtonClose'

export default function HomeTypeAdvantages() {
  const [typeListFiltered, setTypeListFiltered] =
    useState<TypeAdvantages[]>(types)
  const [searchString, setSearchString] = useState('')
  const [selectedType, setSelectedType] = useState('')

  function handleOpenType(type: string) {
    if (selectedType === type) {
      setSelectedType('')
    } else {
      setSelectedType(type)
    }
  }

  function handleTypeSearch(searchedType: string) {
    setSearchString(searchedType)
    const timeout = setTimeout(() => {
      const searchResult = types.filter((type) =>
        type.typeLabel.en
          .toLocaleLowerCase()
          .startsWith(searchedType.trim().toLocaleLowerCase())
      )
      setTypeListFiltered(searchResult)
    }, 300)

    return () => clearTimeout(timeout)
  }

  function clearAll() {
    setSearchString('')
    setSelectedType('')
    setTypeListFiltered(types)
  }

  return (
    <>
      <Heading>
        Pokemon Type <br />
        Advantadges
      </Heading>

      <div className="flex flex-col lg:flex-row items-center justify-center w-fit mx-auto relative gap-2  max-md:gap-4">
        <SearchInput
          value={searchString}
          onChange={(e) => handleTypeSearch(e.target.value)}
        />
        <ButtonClose onClick={clearAll} disabled={!searchString} />
      </div>

      {typeListFiltered.length > 0 ? (
        <section className="grid grid-cols-6 mx-auto mb-4 max-lg:grid-cols-3 max-md:grid-cols-2 animate-fadeIn">
          {typeListFiltered.map((item) => (
            <TypeComponentCard
              key={item.typeLabel.en}
              pokeType={item.typeLabel.en}
              img={item.img}
              advantages={item.advantages}
              disadvantages={item.disadvantages}
              handleOpenType={() => handleOpenType(item.typeLabel.en)}
              selectedType={selectedType}
            />
          ))}
        </section>
      ) : (
        <span className="bg-yellow-200 text-black drop-shadow text-lg font-poppins font-bold w-fit px-3 rounded-lg mx-auto mt-6 animate-fadeIn">
          ⚠️ Pokémon type not found! ⚠️
        </span>
      )}
    </>
  )
}
