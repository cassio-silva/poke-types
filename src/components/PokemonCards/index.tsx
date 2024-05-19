/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PokemonProps as Pokemon } from 'entities/Pokemon';
import { MessageWarning } from 'components/global/MessageWarning';

type PokemonCardProps = {
  pokemon: Pokemon[];
  hasFilterNotFoundPokemon: boolean;
};

export function PokemonCards({
  pokemon,
  hasFilterNotFoundPokemon,
}: PokemonCardProps) {
  const [active, setActive] = useState<number | null>(null);
  function toggleActiveCard(id: number) {
    if (active === id) {
      setActive(null);
    } else {
      setActive(id);
    }
  }

  if (hasFilterNotFoundPokemon) {
    return <MessageWarning>No pokemon of this type was found.</MessageWarning>;
  }

  return (
    <section className="w-11/12 lg:w-fit grid grid-cols-3 md:grid-cols-4 desktop:grid-cols-[repeat(6,160px)] place-items-center gap-3 mx-auto pb-6 animate-fadeIn">
      {pokemon.length > 0 &&
        pokemon?.map((poke) => (
          // Card
          <article
            onClick={() => toggleActiveCard(poke.id)}
            key={poke.id}
            aria-selected={Boolean(active === poke.id)}
            className={`flex w-full h-fit max-w-[160px]
          bg-white shadow-md shadow-gray-300 rounded rounded-bl-2xl rounded-tr-2xl p-[5px]`}
          >
            <div
              className={`
            flex flex-col relative w-full h-full mx-auto bg-gradient-radial from-white to-yellow-400 rounded-xl pb-3 mobile:pb-0
              `}
            >
              {/* pokemon name */}
              <strong
                className="truncate w-full bg-gradient-to-br from-blue-200 to-purple-200 text-white text-xs lg:text-base text-center capitalize font-semibold rounded-md cursor-default"
                title={poke.name}
              >
                {poke.name}
              </strong>

              {poke?.sprites?.front_default ? (
                <Image
                  src={poke?.sprites?.front_default}
                  alt={poke?.name}
                  width={100}
                  height={100}
                  quality={100}
                  draggable="false"
                  className="w-full"
                />
              ) : (
                <Image
                  src={'/pokeball.png'}
                  alt={poke?.name}
                  width={100}
                  height={100}
                  quality={100}
                  draggable="false"
                  className="w-20 h-w-20 m-auto"
                />
              )}

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
  );
}
