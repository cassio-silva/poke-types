interface PokemonProps {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: {
    type: {
      name: string;
    }
  }[]
}

interface PokemonListProps {
  results: {
    name: string;
    url: string;
  }[],
  next: string;
  previous: string;
}

export type {
  PokemonProps,
  PokemonListProps
}