import { PokemonListProps, PokemonProps } from 'entities/Pokemon'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.next({
      status: 403,
      statusText: 'Invalid method',
    })
  }

  const searchParams = req.nextUrl.searchParams

  const limit = searchParams.get('limit')
  const offset = searchParams.get('offset')

  if (!limit && !offset) {
    return NextResponse.next({
      status: 500,
      statusText: 'no "limit" was set',
    })
  }

  try {
    const response: PokemonListProps = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        next: {
          revalidate: 300,
        },
      }
    ).then((res) => res.json())

    const pokemonData = response.results

    const pokemonDataDetailed = pokemonData.map(async (poke) => {
      const _pokeData: PokemonProps = await fetch(poke.url).then(
        (res) => res.json()
      )
      return _pokeData
    })
    const pokemonFullData = await Promise.all(pokemonDataDetailed)
    const pokemonDataReady = pokemonFullData.map((_poke) => {
      return {
        id: _poke.id,
        name: _poke.name,
        sprites: _poke.sprites,
        types: _poke.types,
      }
    })

    return NextResponse.json({
      data: pokemonDataReady,
      next: response.next,
      previous: response.previous,
    })
  } catch (err) {
    console.error(err)
    return new NextResponse(`${err}`, { status: 500 })
  }
}
