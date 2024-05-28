/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client';

import { useState } from 'react';
import { PokemonProps as Pokemon } from 'entities/Pokemon';
import { MessageWarning } from 'components/global/MessageWarning';
import Image from 'next/image';

type PokemonCardProps = {
  pokemon: Pokemon[];
};

export function PokemonCards({ pokemon }: PokemonCardProps) {
  const [isActive, setIsActive] = useState<number | null>(null);

  function toggleActiveCard(id: number) {
    if (isActive === id) {
      setIsActive(null);
    } else {
      setIsActive(id);
    }
  }

  if (pokemon.length < 1) {
    return <MessageWarning>No pokemon of this type was found.</MessageWarning>;
  }

  return (
    <section className="w-11/12 lg:w-fit grid grid-cols-3 md:grid-cols-4 desktop:grid-cols-[repeat(6,160px)] place-items-center gap-3 mx-auto pb-6 animate-fadeIn">
      {pokemon?.map((poke) => (
        // Card
        <article
          key={poke.id}
          onClick={() => toggleActiveCard(poke.id)}
          aria-selected={Boolean(isActive === poke.id)}
          className={`group flex w-full h-[148px] desktop:h-48 max-w-[160px] bg-white shadow-md shadow-gray-300 rounded rounded-bl-2xl rounded-tr-2xl p-[5px] transition transform duration-300 aria-selected:scale-105`}
        >
          <div
            className={`flex flex-col relative justify-center items-center gap-4 w-full h-full mx-auto transition duration-200 bg-gradient-radial from-white to-yellow-400 group-aria-selected:from-orange-200 group-aria-selected:to-purple-200 rounded-xl`}
          >
            {/* pokemon name */}
            <strong
              className="absolute top-0 truncate w-full h-fit px-2 bg-gradient-to-br from-blue-200 to-purple-200 text-white group-aria-selected:text-yellow-200 text-xs lg:text-base text-center capitalize font-semibold rounded-md cursor-default"
              title={poke.name}
            >
              {poke.name}
            </strong>

            {/* Card image */}
            <PokemonCardImage
              sprite={poke?.sprites?.front_default}
              name={poke.name}
              isActive={isActive === poke.id}
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
                  // quality={70}
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

function PokemonCardImage({
  sprite,
  name,
  isActive,
}: {
  sprite: string;
  name: string;
  isActive: boolean;
}) {
  const [imgSrc, setImgSrc] = useState<string>();

  if (!sprite) {
    return (
      <Image
        src={'/pokeball.png'}
        alt={name}
        width={100}
        height={100}
        // quality={80}
        draggable="false"
        className="w-20 h-w-20 m-auto"
      />
    );
  }

  if (isActive) {
    return (
      <Image
        src={
          imgSrc
            ? imgSrc
            : `https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`
        }
        onError={() => {
          setImgSrc(sprite);
        }}
        alt={name}
        width={100}
        height={100}
        unoptimized
        draggable="false"
        className="w-full h-fit mx-auto mt-auto mb-auto desktop:mb-3 animate-pokemon-spawn"
      />
    );
  }

  return (
    <Image
      src={sprite}
      alt={name}
      width={96}
      height={96}
      // quality={90}
      draggable="false"
      className="w-full h-fit m-auto mobile:mb-0 desktop:mb-2 cursor-pointer place-self-end"
    />
  );
}
