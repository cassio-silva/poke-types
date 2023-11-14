import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { LanguageContext } from "contexts/LanguageContext";
import { Navbar } from "components/Navbar";
import { Content, GymTimeForm, Separator } from "../../styles/pages/pokecoins/styles";
import { Heading } from "components/global/Heading";
import Image from "next/image";

const Pokecoins: NextPage = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [alert, setAlert] = useState(false);
  const [coins, setCoins] = useState<number>(0);
  const { langContent, title } = useContext(LanguageContext);
  const coinRef = useRef<any>();

  useEffect(() => {
    if (Number(minutes) >= 60) {
      setMinutes("1");
      setHours((Number(hours) + 1).toString())
    } else if (Number(minutes) < 0) {
      setMinutes("59");
      setHours((Number(hours) - 1).toString())
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
      setCoins(50);
      if (!alert) {
        setAlert(true);
        setTimeout(() => {
          setAlert(false)
        }, 6000);
      }
      coinRef.current.focus();
    } else {
      setCoins(totalCoins);
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
    <section>
      <Head><title>{title} Pokecoins</title></Head>

      <Navbar />
      <Heading>{langContent.calculator}</Heading>

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
        <span className={alert ? "alert" : ""}>{langContent.coinsPerDay}</span>
        <p>
          {langContent.buttonMessage.split("pokecoin")[0]}<br />
          {langContent.buttonMessage.split("pokecoin")[1]}
        </p>
        <Separator isShown={isShown} coins={coins}>
          <button
            key={`btn${coins}`}
            onClick={handleCoinCalculation}
          >
            <Image src="/assets/pokecoin.png" alt="Pokecoin" draggable="false" />
          </button>
          <span
            id="coins"
            key={coins}
            ref={coinRef}
            tabIndex={0}
            aria-label={`moedas: ${coins}, coins: ${coins}`}
          >
            {coins}
          </span>
        </Separator>
      </Content>
    </section>
  )
}

export default Pokecoins;