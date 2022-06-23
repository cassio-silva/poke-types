import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { SearchInput } from '../components/SearchInput';
import { TypeComponent } from '../components/TypeComponent';

type TypeAdvantages = {
  typeLabel: string;
  img: string;
  advantages: string[];
  disadvantages: string[];
}

const Home: NextPage = () => {
  const [typeListFiltered, setTypeListFiltered] = useState<TypeAdvantages[]>([]);
  const [searchString, setSearchString] = useState("");

  const typeList: TypeAdvantages[] = [
    {
      typeLabel: "bug",
      img: "assets/bug.png",
      advantages: ["dark", "grass", "psychic"],
      disadvantages: ["fire", "flying", "rock"]
    },
    {
      typeLabel: "dark",
      img: "assets/dark.png",
      advantages: ["ghost", "psychic"],
      disadvantages: ["bug", "fairy", "fighting"]
    },
    {
      typeLabel: "dragon",
      img: "assets/dragon.png",
      advantages: ["dragon"],
      disadvantages: ["dragon", "fairy", "ice"]
    },
    {
      typeLabel: "normal",
      img: "assets/normal.png",
      advantages: [],
      disadvantages: ["fighting"]
    },
    {
      typeLabel: "steel",
      img: "assets/steel.png",
      advantages: ["fairy", "ice", "rock"],
      disadvantages: ["fighting", "fire", "earth"]
    },
    {
      typeLabel: "fairy",
      img: "assets/fairy.png",
      advantages: ["dark", "dragon", "fighting"],
      disadvantages: ["poison", "steel"]
    },
    {
      typeLabel: "fighting",
      img: "assets/fighting.png",
      advantages: ["dark", "ice", "normal", "rock", "steel"],
      disadvantages: ["fairy", "flying", "psychic"]
    },
    {
      typeLabel: "ghost",
      img: "assets/ghost.png",
      advantages: ["ghost", "psychic"],
      disadvantages: ["ghost", "dark"]
    },
    {
      typeLabel: "fire",
      img: "assets/fire.png",
      advantages: ["bug", "grass", "ice", "steel"],
      disadvantages: ["earth", "rock", "water"]
    },
    {
      typeLabel: "water",
      img: "assets/water.png",
      advantages: ["earth", "rock", "fire"],
      disadvantages: ["electric", "grass"]
    },
    {
      typeLabel: "electric",
      img: "assets/electric.png",
      advantages: ["flying", "water"],
      disadvantages: ["earth"]
    },
    {
      typeLabel: "flying",
      img: "assets/flying.png",
      advantages: ["bug", "grass", "fighting"],
      disadvantages: ["electric", "ice", "rock"]
    },
    {
      typeLabel: "psychic",
      img: "assets/psychic.png",
      advantages: ["fighting", "poison"],
      disadvantages: ["bug", "dark", "ghost"]
    },
    {
      typeLabel: "earth",
      img: "assets/earth.png",
      advantages: ["electric", "fire", "poison", "rock", "steel"],
      disadvantages: ["grass", "ice", "water"]
    },
    {
      typeLabel: "rock",
      img: "assets/rock.png",
      advantages: ["grass", "fire", "flying", "ice"],
      disadvantages: ["fighting", "grass", "earth", "steel", "water"]
    },
    {
      typeLabel: "ice",
      img: "assets/ice.png",
      advantages: ["dragon", "flying", "earth", "grass"],
      disadvantages: ["fighting", "fire", "rock", "steel"]
    },
    {
      typeLabel: "poison",
      img: "assets/poison.png",
      advantages: ["fairy", "grass"],
      disadvantages: ["earth", "psychic"]
    },
    {
      typeLabel: "grass",
      img: "assets/grass.png",
      advantages: ["earth", "rock", "water"],
      disadvantages: ["bug", "fire", "flying", "ice", "poison"]
    },
  ]

  useEffect(() => {
    setTypeListFiltered(typeList);
  }, [])

  useEffect(() => {
    setTypeListFiltered(typeList.filter(
      (item) => item.typeLabel.startsWith(searchString.toLocaleLowerCase())
    ))
  }, [searchString])

  return (
    <Content>
      <Head><title>PokéTypes</title></Head>

      <Title>Pokémon Type Advantages</Title>

      <SearchInput
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />

      <Wrapper>
        {typeListFiltered.map((item) => (
          <TypeComponent
            key={item.typeLabel}
            typeLabel={item.typeLabel}
            img={item.img}
            advantages={item.advantages}
            disadvantages={item.disadvantages}
          />
        ))}
      </Wrapper>
    </Content>
  )
}

export default Home

const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 2rem 1rem 1rem;
  background: linear-gradient(0deg, ${props => props.theme.color.blue[300]} 0%, ${props => props.theme.color.blue[200]} 90%);
  
`;

const Wrapper = styled.section<any>`
  display: grid;
  grid: 1fr / repeat(2, 1fr);
 
  margin: 3rem auto 1rem;
  
  @media (min-width: 768px) {
    grid: 1fr / repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid: 1fr / repeat(6, 1fr);
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
  width: 100%;

  -webkit-text-fill-color: ${props => props.theme.color.yellow[200]};
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;

  @media (max-width: 375px) {
    font-size: 3.5rem;
  }
`;
