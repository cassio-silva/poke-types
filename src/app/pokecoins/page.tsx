import { NextPage } from 'next'
import { Heading } from 'components/global/Heading'

import { PokecoinControls } from 'components/PokecoinsControls'

const Pokecoins: NextPage = () => {
  return (
    <>
      <Heading>
        Pokécoin <br /> Calculator
      </Heading>

      <section className="w-11/12 flex flex-col gap-4 items-center justify-center mx-auto">
        <strong className="text-white text-2xl font-roboto">
          Tyme on Gym
        </strong>

        <PokecoinControls />
      </section>
    </>
  )
}

export default Pokecoins
