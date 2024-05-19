type PokemonProps = {
  name: string
  id: number
  sprites: {
    front_default: string
    back_default: string
  }
  types: {
    type: {
      name: string
    }
  }[]
}

type PokemonListProps = {
  results: {
    name: string
    url: string
  }[]
  next: string
  previous: string
}

type PokemonResponseProps = {
  data: PokemonProps[]
  next: string
  previous: string
}

export type { PokemonProps, PokemonListProps, PokemonResponseProps}
