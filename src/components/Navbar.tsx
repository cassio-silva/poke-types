import Link from "next/link";
import styled from "styled-components";

export function Navbar() {
  return (
    <Container>
      <Link href="/">
        <a>Type Advantages</a>
      </Link>

      <Link href="/pokecoins">
        <a>Pokécoin Calculator</a>
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
  background: linear-gradient(0deg, ${props => props.theme.color.blue[200]} 0%, ${props => props.theme.color.blue[300]} 60%) ;

  position: fixed;
  top: 0;
  z-index: 200;

  box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.5);

  a {
    text-decoration: none;
    text-align: center;
    color: inherit;
    font-size: 1.75rem;
    margin: 0 4px;

    white-space: pre-wrap;

    background: ${props => props.theme.color.green[200]};
    padding: 0.5rem 1.25rem;
    border-radius: 120px;
    transition: 0.3s;
    
    &:hover {
      filter: brightness(1.25);
    }
  }

  @media (max-width: 440px) {
    
    a {
      font-size: 1.25rem;
    }
  }
`;