import { PokemonListProps, PokemonProps } from 'entities/Pokemon'
import { NextRequest, NextResponse } from 'next/server'
import { api } from 'services/api'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const limit = searchParams.get('limit')
  const offset = searchParams.get('offset')

  if (!limit && !offset) {
    return
  }

  try {
    const response = await api.get<PokemonListProps>(
      `pokemon?limit=${limit}&offset=${offset}`
    )

    const pokemonList = response.data
    const pokemonData = pokemonList.results
    
    const pokemonDataDetailed = pokemonData.map(async (poke) => {
      const _pokeData = await api.get<PokemonProps>(poke.url)
      return _pokeData.data
    })
    const pokeData = await Promise.all(pokemonDataDetailed)
    const pokemonDataReady = pokeData.map((_poke) => {
      return {
        id: _poke.id,
        name: _poke.name,
        sprites: _poke.sprites,
        types: _poke.types,
      }
    })

    if (req.method !== 'GET') {
      return NextResponse.next({
        status: 403,
        statusText: 'Invalid method',
      })
    }

    return NextResponse.json({
      data: pokemonDataReady,
      next: pokemonList.next,
      previous: pokemonList.previous,
    })
  } catch (err) {
    return new NextResponse(`${err}`, { status: 500 })
  }
}
