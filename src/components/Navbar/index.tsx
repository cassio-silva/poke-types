'use client';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { NavbarLink } from './NavbarLinks';
import Image from 'next/image';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  if (width && width <= 768) {
    return (
      <header className="flex flex-row justify-center items-center w-full px-4 py-2 bg-gradient-radial from-lime-100 to-teal-200 fixed bottom-0 shadow-[0px_3px_6px_2px_rgba(0,0,0,0.25)] z-[200]">
        <button
          aria-expanded={isOpen}
          className="flex border-0 w-12 rounded-[40px] bg-transparent p-0.5 aria-expanded:animate-pokeball-spin"
          onClick={handleToggleMenu}
        >
          <Image
            width={120}
            height={120}
            className="w-full"
            src="/pokeball.png"
            alt=""
            draggable="false"
          />
        </button>
        <nav
          data-expanded={isOpen}
          className="group flex flex-col gap-1 absolute left-1/2 bottom-0 data-[expanded=true]:animate-pokeball-spawn-mobile transition-all w-0 data-[expanded=true]:w-fit overflow-hidden data-[expanded=true]:overflow-visible"
        >
          <NavbarLink
            className="transition duration-500 transform translate-x-0 group-data-[expanded=true]:translate-x-16"
            href="/"
          >
            Type Advantadges
          </NavbarLink>
          <NavbarLink
            className="transition duration-500 transform translate-x-0 group-data-[expanded=true]:translate-x-8"
            href="/pokemon"
          >
            Pokémon
          </NavbarLink>
          <NavbarLink href="/pokecoins">Pokecoin Calculator</NavbarLink>
        </nav>
      </header>
    );
  }

  return (
    <header className="flex flex-row justify-start items-center w-full px-4 py-4 bg-gradient-radial from-lime-100 to-teal-200 fixed top-0 shadow-[0px_3px_6px_2px_rgba(0,0,0,0.25)] z-[200]">
      <button
        aria-expanded={isOpen}
        className="flex border-0 w-12 rounded-[40px] bg-transparent p-0.5 aria-expanded:animate-pokeball-spin"
        onClick={handleToggleMenu}
      >
        <Image
          width={200}
          height={200}
          className="w-full"
          src="/pokeball.png"
          alt=""
          draggable="false"
        />
      </button>

      <nav
        data-expanded={isOpen}
        className={`flex flex-col gap-1 absolute left-2 top-2 data-[expanded=true]:animate-pokeball-spawn w-0 data-[expanded=true]:w-fit overflow-hidden`}
      >
        <NavbarLink href="/">Type Advantadges</NavbarLink>
        <NavbarLink href="/pokemon">Pokémon</NavbarLink>
        <NavbarLink href="/pokecoins">Pokecoin Calculator</NavbarLink>
      </nav>

      {/* <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="ptbr">PT-BR</option>
        <option value="eng">ENG</option>
      </select> */}
    </header>
  );
}
