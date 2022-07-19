import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { Navbar } from "../components/Navbar";
import styled, { css } from "styled-components";
import { GlobalContainer, Title } from "../styles/GlobalComponentStyles";
import { LanguageContext } from "../contexts/LanguageContext";

const Pokecoins: NextPage = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [coins, setCoins] = useState<number>(0);
  const { langContent } = useContext(LanguageContext);

  useEffect(() => {
    if (Number(minutes) > 59) {
      setMinutes("0");
      setHours((Number(hours) + 1).toString())
    } else if (Number(minutes) < 1) {
      setMinutes("");
    }
  }, [minutes])

  useEffect(() => {
    if (Number(hours) > 23) {
      setHours("23");
    } else if (Number(hours) < 1) {
      setHours("");
    }
  }, [hours])

  function handleCoinCalculation() {
    const h = Number(hours);
    const min = Number(minutes);

    const totalCoins = (h * 6) + Math.floor(min * 0.1);

    if (totalCoins > 50) {
      return setCoins(50)
    } else {
      return setCoins(totalCoins)
    }
  }

  useEffect(() => {
    if (coins <= 0) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  }, [coins])

  return (
    <GlobalContainer>
      <Head><title>PokéTools | Pokecoins</title></Head>

      <Navbar />
      <Title>{langContent.calculator}</Title>

      <Content>
        <h2>{langContent.gymTime}</h2>

        <GymTimeForm>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={langContent.hours}
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={langContent.minutes}
          />
        </GymTimeForm>
        <p>
          {langContent.buttonMessage.split("pokecoin")[0]}<br />
          {langContent.buttonMessage.split("pokecoin")[1]}
        </p>
        <Separator isShown={isShown}>
          <button onClick={handleCoinCalculation}>
            <img src="/assets/pokecoin.png" alt="Pokecoin" />
          </button>
          <span key={coins}>{coins}</span>
        </Separator>
      </Content>
    </GlobalContainer>
  )
}

export default Pokecoins;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${props => props.theme.font.Poppins};

  width: 95%;
  max-width: 40rem;
  margin-top: 2rem;

  img {
    width: 100%;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #FFF;
    text-align: center;
  }
  p {
    color: ${props => props.theme.color.gray[50]};
    text-align: center;
  }
`;

const GymTimeForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1rem auto;

  input {
    width: 7rem;
    height: 4rem;
    font-size: 1.5rem;
    font-weight: 600;
    border: none;

    & + input {
      margin-left: 4px;
    }

    &::placeholder {
      font-size: 1rem;
    }
    
    &:first-child {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      padding-left: 2rem;
      padding-right: 8px;
      
      &::placeholder {
        text-align: right;
      }
    }
    &:last-child {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      padding-left: 8px;
      padding-right: 1.75rem;
      
      &::placeholder {
        text-align: left;
      }
    }
  }
`;

const Separator = styled.div<any>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  margin: 2rem auto;

  &:first-child {
    width: 50%;
  }
  &:last-child {
    width: 50%;
  }

  button {
    border: none;
    border-radius: 50%;
    width: 7rem;
    background: transparent;
    position: relative;

    transition: 0.2s;

    &:hover {
      filter: brightness(1.3);
      transform: rotate3d(360deg);
    }
  }

  span {
    font-size: 3rem;
    font-weight: 800;
    color: #FFF;

    ${props => props.isShown && css`
      animation: 1s fadeIn ease-in-out;
    `}

    @keyframes fadeIn {
      from {
        opacity: 0;        
      }
      to {opacity: 1}
    }
  }
`;