import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Navbar } from '../components/Navbar';
import { SearchInput } from '../components/SearchInput';
import { TypeComponent } from '../components/TypeComponent';
import { LanguageContext } from '../contexts/LanguageContext';
import { GlobalContainer, Title } from '../styles/GlobalComponentStyles';
import types from "../json/types.json";
import typesPtbr from "../json/types-ptbr.json";

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
  const { language, langContent } = useContext(LanguageContext)

  const typeList = types;
  const typeListTranslated = typesPtbr;

  useEffect(() => {
    if (language === "eng") {
      setTypeListFiltered(typeList);
    } else {
      setTypeListFiltered(typeListTranslated)
    }
  }, [language])

  useEffect(() => {
    setTimeout(() => {
      if (language === "eng") {
        setTypeListFiltered(typeList.filter(
          (item) => item.typeLabel.startsWith(searchString.toLocaleLowerCase().trim())
        ))
      } else {
        setTypeListFiltered(typeListTranslated.filter(
          (item) => item.typeLabel.startsWith(searchString.toLocaleLowerCase().trim())
        ))
      }
    }, 300);
  }, [searchString])

  return (
    <GlobalContainer>
      <Head><title>PokéTools</title></Head>

      <Navbar />

      <Title>
        {langContent.homeTitle.split(" ")[0]} {langContent.homeTitle.split(" ")[1]}<br />
        {langContent.homeTitle.split(" ")[2]} {langContent.homeTitle?.split(" ")[3]}
      </Title>
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