/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PokemonProps as Pokemon } from 'entities/Pokemon'
import { MessageWarning } from 'components/global/MessageWarning'

type PokemonCardProps = {
  pokemon: Pokemon[]
}

export function PokemonCards({ pokemon }: PokemonCardProps) {
  const [active, setActive] = useState<number | null>(null)

  function toggleActiveCard(id: number) {
    if (active === id) {
      setActive(null)
    } else {
      setActive(id)
    }
  }

  return (
    <section className="w-11/12 lg:w-fit grid grid-cols-[repeat(2,auto)] md:grid-cols-4 desktop:grid-cols-[repeat(6,160px)] place-items-center gap-3 mx-auto animate-fadeIn">
      {pokemon?.map((poke) => (
        // Card
        <article
          onClick={() => toggleActiveCard(poke.id)}
          key={poke.id}
          aria-selected={active === poke.id}
          className={`flex w-full h-full max-w-[160px] min-h-[180px]
          bg-white shadow-md shadow-gray-300 rounded rounded-bl-2xl rounded-tr-2xl p-2`}
        >
          <div
            className={`flex flex-col relative w-full h-full mx-auto bg-gradient-radial from-white to-yellow-400 rounded-lg
              `}
          >
            {/* pokemon name */}
            <strong className="bg-gradient-to-br from-blue-200 to-purple-200 text-white capitalize font-semibold text-sm text-center rounded-md">
              {poke.name}
            </strong>

            <Image
              src={poke.sprites.front_default}
              alt={poke.name}
              width={100}
              height={100}
              quality={100}
              draggable="false"
              className="w-full h-full"
            />

            {/* types */}
            <footer className="flex gap-0.5 absolute bottom-0 right-0">
              {poke.types.map((item, index) => (
                <Image
                  key={index}
                  src={`/assets/${item.type.name}.png`}
                  alt={item.type.name}
                  width={60}
                  height={60}
                  quality={100}
                  draggable="false"
                  className="w-8 h-8 rounded-full p-0.5 bg-white shadow-lg"
                />
              ))}
            </footer>
          </div>
        </article>
      ))}
    </section>
  )
}
