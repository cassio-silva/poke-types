import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { LanguageContext } from "../contexts/LanguageContext";

export function Navbar() {
  const [browserWindow, setBrowserWindow] = useState<Window>();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, langContent } = useContext(LanguageContext);

  useEffect(() => {
    setBrowserWindow(window);
  }, [])

  return (
    <NavContainer>
      <PokeballMenuButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/pokeball.png" alt="" draggable="false" />
      </PokeballMenuButton>

      <ContainerMenu isOpen={isOpen}>
        <Link href="/" >
          <a className={browserWindow?.location?.pathname === "/" ? "active" : ""}>{langContent.buttonAdvantage}</a>
        </Link>

        <Link href="/pokecoins" >
          <a className={browserWindow?.location?.pathname.includes("pokecoins") ? "active" : ""}>{langContent.calculator}</a>
        </Link>
      </ContainerMenu>

      <SelectLanguage value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="ptbr">PT-BR</option>
        <option value="eng">ENG</option>
      </SelectLanguage>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
  
  padding: 0.5rem 1rem;

  background: radial-gradient(circle at center, 
    ${props => props.theme.color.green[50]} 0%, 
    ${props => props.theme.color.green[200]} 100%
    );
    
    position: fixed;
    top: 0;
    box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.5);
    z-index: 200;
    
  @media (max-width: 440px) {
    justify-content: center;
    top: unset;
    bottom: 0;
  }
`;

const PokeballMenuButton = styled.button<any>`
  display: flex;
  border: none;
  width: 48px;
  border-radius: 40px;
  
  background: transparent;
  
  padding: 2px;
  box-sizing: border-box;

  animation: ${props => props.isOpen && "rotate 0.5s ease-in-out"};
  
  img {
    width: 100%;
  }

  @keyframes rotate {
    0% { 
      transform: rotate(0deg);
    }
    100% { 
      transform: rotate(720deg);
    }
  }
  
  @media (min-width: 768px) {
    padding: 8px;
    width: 60px;
  }
`;

const ContainerMenu = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #FFF;
  width: 360px;
  height: ${props => props.isOpen ? "5rem" : "0"};
  overflow: ${props => props.isOpen ? "unset" : "hidden"};
  
  position: absolute;
  top: 4.5rem;
  left: 0;
  transition: 0.2s;

  a {
    text-decoration: none;
    text-align: center;
    color: inherit;
    font-size: 1.5rem;
    margin: 0 4px;

    white-space: pre-wrap;

    background: radial-gradient(circle at left top, ${props => props.theme.color.greenLight[100]} 0%, ${props => props.theme.color.green[200]} 90%);
    filter: contrast(0.75) brightness(0.85);
    padding: 0.5rem 1.25rem;
    border-radius: 120px;
    transition: 0.3s;

    &:hover , &.active {
      filter: unset;
    }
    animation: ${props => props.isOpen && "lightDown 0.5s ease-in-out"};
  }
  a:nth-child(1) {
    ${props => props.isOpen && css`
      transform: translate(5%, -100%);
    `}
  }
  a:nth-child(2) {
    ${props => props.isOpen && css`
      transform: translate(-5%, -90%);
    `}
  }

  @keyframes lightDown {
    0% {
      opacity: 0;
      filter: brightness(5);
    }
    100% {
      opacity: 1;
      filter: brightness(1)
    }
  }

  @media (max-width: 440px) {
    top: unset;
    bottom: 4rem;
    left: unset;
    right: 0;
    height: ${props => props.isOpen ? "6rem" : "0"};
    a {
      font-size: 1.25rem;
    }
    a:nth-child(1) {
    ${props => props.isOpen && css`
      transform: translate(35%, -10%);
    `}
    }
    a:nth-child(2) {
      ${props => props.isOpen && css`
        transform: translate(5%, 0%);
      `}
    }
  }
`;

const SelectLanguage = styled.select`
  font-family: ${props => props.theme.font.Poppins};
  font-weight: 800;
  font-size: 1.125rem;
  color: #FFF;

  border: none;
  border-radius: 0.25rem;
  background-color: rgba(100, 100, 100, 0.5);

  position: absolute;
  right: 5%;
  cursor: pointer;
`;