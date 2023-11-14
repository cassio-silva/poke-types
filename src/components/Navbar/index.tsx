'use client'
import { useState } from 'react'
import { useWindowSize } from 'hooks/useWindowSize'
import { NavbarLink } from './NavbarLinks'
import Image from 'next/image'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { width } = useWindowSize()

  function handleToggleMenu() {
    setIsOpen(!isOpen)
  }

  if (width && width <= 540) {
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
        <div
          aria-expanded={isOpen}
          className="group flex flex-col gap-1 absolute left-1/2 bottom-0 aria-expanded:animate-pokeball-spawn-mobile transition-all w-0 aria-expanded:w-fit overflow-hidden aria-expanded:overflow-visible"
        >
          <NavbarLink
            className="transition duration-500 transform translate-x-0 group-aria-expanded:translate-x-[125%]"
            href="/pokemon"
          >
            Pokémon
          </NavbarLink>

          <NavbarLink
            className="transition duration-500 transform translate-x-0 group-aria-expanded:translate-x-[25%]"
            href="/"
          >
            Type Advantadges
          </NavbarLink>

          <NavbarLink href="/">Pokecoin Calculator</NavbarLink>
        </div>
      </header>
    )
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

      <div
        aria-expanded={isOpen}
        className={`flex flex-col gap-1 absolute left-2 top-2 aria-expanded:animate-pokeball-spawn w-0 aria-expanded:w-fit overflow-hidden`}
      >
        <NavbarLink href="/pokemon">Pokémon</NavbarLink>
        <NavbarLink href="/">Type Advantadges</NavbarLink>
        <NavbarLink href="/">Pokecoin Calculator</NavbarLink>
      </div>

      {/* <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="ptbr">PT-BR</option>
        <option value="eng">ENG</option>
      </select> */}
    </header>
  )
}
