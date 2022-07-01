import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export function Navbar() {
  const [browserWindow, setBrowserWindow] = useState<Window>();

  useEffect(() => {
    setBrowserWindow(window);
  }, [])

  return (
    <Container>
      <Link href="/" >
        <a className={browserWindow?.location?.pathname === "/" ? "active" : ""}>Type Advantages</a>
      </Link>

      <Link href="/pokecoins" >
        <a className={browserWindow?.location?.pathname.includes("pokecoins") ? "active" : ""}>Pokécoin Calculator</a>
      </Link>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  margin: 0 2rem;
  padding: 1rem;

  color: #FFF;
  /* background: linear-gradient(90deg, ${props => props.theme.color.purple[100]} 0%, ${props => props.theme.color.blue[300]} 70%); */
  background: radial-gradient(circle at center, 
    ${props => props.theme.color.green[50]} 0%, 
    ${props => props.theme.color.green[200]} 100%
    );

  position: fixed;
  top: 0;
  z-index: 200;

  box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.5);

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
    
    &:hover {
      filter: unset;
    }
    
    &.active {
      filter: unset;
    }
  }

  @media (max-width: 440px) {
    top: unset;
    bottom: 0;
    a {
      font-size: 1.25rem;
    }
  }
`;