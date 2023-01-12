import Head from "next/head";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { api } from "services/api";
import { GlobalContainer } from "styles/GlobalComponentStyles";
import { Navbar } from "components/Navbar";
import { PokemonCards } from "components/PokemonCards";
import { Pagination } from "components/Pagination";
import { PokemonListProps, PokemonProps } from "entities/Pokemon";
import { ButtonClear, ButtonType, Content, ErrorMessage, LoadingImage, TypeFilter } from "../../styles/pages/pokemon/styles";
// JSON
import typesEng from "../../json/types.json";

export default function Pokemon(props: PokemonListProps) {
  const [types, setTypes] = useState<string[]>(["", ""]);
  const [pokemonList, setPokemonList] = useState<PokemonProps[]>([]);
  const [filterPokemon, setFilterPokemon] = useState<PokemonProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState<Partial<PokemonListProps>>();
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getPokemon();
  }, [])

  useEffect(() => {
    if (filterPokemon.length < 1 && !isLoading) {
      setError("No pokémon of this type was found")
    } else {
      setError("")
    }
  }, [filterPokemon, isLoading])

  useEffect(() => {
    filterByType();
  }, [types, pokemonList])

  function filterByType() {
    try {
      // Both types are falsy (the function filling types[] will never fill only the second position)
      setIsLoading(true)
      if (!types[0] && !types[1]) {
        const orderedList = pokemonList?.sort((pokeA, pokeB) => pokeA.id > pokeB.id ? 1 : -1)
        setFilterPokemon(orderedList);
      }
      // if second type is truthy (both types are filled)
      if (types[1]) {
        const doubleFilter = pokemonList?.filter(
          (poke) => {
            if (
              (poke.types[0]?.type.name.startsWith(types[0]) &&
                poke.types[1]?.type.name.startsWith(types[1])
              ) ||
              (poke.types[0]?.type.name.startsWith(types[1]) &&
                poke.types[1]?.type.name.startsWith(types[0])
              )
            ) {
              return poke;
            }
          }
        )
        setFilterPokemon(doubleFilter);
      }
      // Only the first type is truthy
      if (types[0] && !types[1]) {
        const filteredList = pokemonList?.filter(
          (poke) => poke.types?.find((item) => item.type?.name.startsWith(types[0]))
        );
        setFilterPokemon(filteredList);
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      setIsLoading(false)
    }
  }

  function handleTypeSelection(type: string) {
    if (types[0] && types[0] === type) {
      resetTypes();
    }
    if (!types[0]) {
      setTypes([type, ""])
    }
    if (types[0] && !types[1] && types[0] !== type) {
      setTypes([types[0], type])
    }
  }

  async function getPokemon() {
    setPages({
      next: props.next,
      previous: props.previous
    });
    try {
      setIsLoading(true);
      const _pokes = props.results.map(async (pokemon) => {
        const res = await api.get<PokemonProps>(pokemon.url);
        return res.data;
      })
      const _pokemon = await Promise.all(_pokes);
      if (_pokemon) {
        const _sortedPokemon = _pokemon.sort((pokeA, pokeB) => pokeA.id > pokeB.id ? 1 : -1);
        setPokemonList(_sortedPokemon);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  async function fetchNewPokemon(endpoint: string) {
    try {
      setIsLoading(true);
      const _pokes = await api.get(endpoint);
      const _pokeList = _pokes.data.results.map(async (poke: any) => {
        const pokeResponse = await api.get(poke.url);
        return pokeResponse.data;
      });
      const _pokemon = await Promise.all(_pokeList);
      if (_pokemon) {
        const _sortedPokemon = _pokemon.sort((pokeA, pokeB) => pokeA.id > pokeB.id ? 1 : -1);
        setPokemonList(_sortedPokemon);
        setPages({
          next: _pokes.data.next,
          previous: _pokes.data.previous
        })
      }
      setIsLoading(false);
    } catch (err) {
      setError(`Error loading pokemon`)
      setIsLoading(false);
    }
  }

  async function getNextPage() {
    if (pages?.next) {
      fetchNewPokemon(pages.next)
      filterByType()
      setCurrentPage(currentPage + 1);
    }
  }

  async function getPreviousPage() {
    if (pages?.previous) {
      fetchNewPokemon(pages.previous)
      filterByType()
      setCurrentPage(currentPage - 1);
    }
  }

  function resetTypes() {
    setTypes(["", ""]);
  }

  return (
    <GlobalContainer>
      <Head>
        <title>Poketools | Pokemon</title>
      </Head>
      <Navbar />
      <Content>
        <TypeFilter>
          {typesEng.map((type) => (
            <ButtonType
              key={type.typeLabel}
              selected={types?.find((item) => item === type.typeLabel) ? true : false}
              onClick={() => handleTypeSelection(type.typeLabel)}
            >
              <img src={type.img} alt={type.typeLabel} />
            </ButtonType>
          ))}
        </TypeFilter>

        <ButtonClear
          onClick={resetTypes}
        >
          Limpar
        </ButtonClear>
        <Pagination
          currentPage={currentPage}
          getNextPage={getNextPage}
          getPreviousPage={getPreviousPage}
        />
        {Boolean(error) && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        {isLoading && (
          <LoadingImage src="spinner.png" />
        )}
        {!isLoading && filterPokemon.length >= 1 && (
          <PokemonCards pokemon={filterPokemon} />
        )}
      </Content>
    </GlobalContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const itemsPerPage = 16;
  const res = await api.get(`pokemon?limit=${itemsPerPage}&offset=0`);
  const data = res.data;

  return {
    props: data,
    revalidate: 1000 * 60
  }
}