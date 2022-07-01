import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Navbar } from '../components/Navbar';
import { SearchInput } from '../components/SearchInput';
import { TypeComponent } from '../components/TypeComponent';
import { GlobalContainer, Title } from '../styles/GlobalComponentStyles';

type TypeAdvantages = {
  typeLabel: string;
  img: string;
  advantages: string[];
  disadvantages: string[];
}

const Home: NextPage = () => {
  const [typeListFiltered, setTypeListFiltered] = useState<TypeAdvantages[]>([]);
  const [searchString, setSearchString] = useState("");
  const [selected, setSelected] = useState("");

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
      disadvantages: ["fighting", "fire", "ground"]
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
      disadvantages: ["ground", "rock", "water"]
    },
    {
      typeLabel: "water",
      img: "assets/water.png",
      advantages: ["ground", "rock", "fire"],
      disadvantages: ["electric", "grass"]
    },
    {
      typeLabel: "electric",
      img: "assets/electric.png",
      advantages: ["flying", "water"],
      disadvantages: ["ground"]
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
      typeLabel: "ground",
      img: "assets/ground.png",
      advantages: ["electric", "fire", "poison", "rock", "steel"],
      disadvantages: ["grass", "ice", "water"]
    },
    {
      typeLabel: "rock",
      img: "assets/rock.png",
      advantages: ["grass", "fire", "flying", "ice"],
      disadvantages: ["fighting", "grass", "ground", "steel", "water"]
    },
    {
      typeLabel: "ice",
      img: "assets/ice.png",
      advantages: ["dragon", "flying", "ground", "grass"],
      disadvantages: ["fighting", "fire", "rock", "steel"]
    },
    {
      typeLabel: "poison",
      img: "assets/poison.png",
      advantages: ["fairy", "grass"],
      disadvantages: ["ground", "psychic"]
    },
    {
      typeLabel: "grass",
      img: "assets/grass.png",
      advantages: ["ground", "rock", "water"],
      disadvantages: ["bug", "fire", "flying", "ice", "poison"]
    },
  ]

  useEffect(() => {
    setTypeListFiltered(typeList);
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setTypeListFiltered(typeList.filter(
        (item) => item.typeLabel.startsWith(searchString.toLocaleLowerCase().trim())
      ))
    }, 300);
  }, [searchString])

  useEffect(() => {
    console.log(selected);
  }, [selected])

  return (
    <GlobalContainer>
      <Head><title>PokéTools</title></Head>

      <Navbar />

      <Title>Pokémon Type <br/> Advantages</Title>
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
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </Wrapper>
    </GlobalContainer>
  )
}

export default Home

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