import { useState } from "react";
import styled from "styled-components";

type Pokemon = {
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

type PokemonCardProps = {
  pokemon: Pokemon[];
}

export function PokemonCards({ pokemon }: PokemonCardProps) {
  const [active, setActive] = useState<number | null>(null);

  function toggleActiveCard(id: number) {
    if (active === id) {
      setActive(null);
    } else {
      setActive(id);
    }
  }

  return (
    <PokemonBox
      length={pokemon?.length}
    >
      {pokemon?.map((poke) => (
        <div
          onClick={() => toggleActiveCard(poke.id)}
          key={poke.id}
          className={`poke ${active === poke.id ? `active` : ``}`}
        >
          <span className="name">{poke.name}#{poke.id}</span>
          <img src={poke.sprites.front_default} alt={poke.name} draggable="false" />
          <PokemonTypes>
            {poke.types.map((item, index) => (
              <IconTypes
                key={index}
                src={`/assets/${item.type.name}.png`}
                alt={item.type.name}
                draggable="false"
              />
            ))}
          </PokemonTypes>
        </div>
      ))}
    </PokemonBox>
  )
}

const PokemonBox = styled.section<any>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(${props => props.length} / 2, 1fr);

  grid-gap: 16px;
  margin: 2rem;
  
  div.poke {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 6px solid ${props => props.theme.color.gray[50]};
    width: 100%;
    height: 160px;
    position: relative;
    background: radial-gradient(circle at center, #fff 0%, ${props => props.theme.color.yellow[300]} 80%);
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    transition: 0.3s ease-in-out;
    cursor: pointer;

    & > img {
      width: 120px;
      transition: 0.3s;
    }

    span {
      display: block;
      white-space: nowrap;
    }

    &.active {
      transform: scale(1.25);
      z-index: 20;
      animation: flash forwards 0.5s;
      background: radial-gradient(circle at center, #00c799 0%, #404590 80%);

      & > img {
        transform: scale(140%);
      }
    }
  }
  
  span {
    color: #fff;
    text-transform: capitalize;
    padding: 4px 8px;
    background: linear-gradient(140deg, ${props => props.theme.color.blue[50]} 0%, ${props => props.theme.color.blue[300]} 100%);
    border-radius: 6px;
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translate(-50%, 50%);
  }

  @keyframes flash {
    0% {transform: translate(0); filter: brightness(2);}
    25% {transform: translate(3px, -8px)}
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 140px);
    grid-template-rows: repeat(${props => props.length} / 5, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(8, 140px);
    grid-template-rows: repeat(${props => props.length} / 5, 1fr);
  }
`;

const PokemonTypes = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 2rem;
  border-radius: 50%;
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

const IconTypes = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  margin: 0;
  position: relative;

  & + img {
    margin-left: 4px;
  }
`;