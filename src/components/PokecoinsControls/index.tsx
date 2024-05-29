'use client';
import { FormEvent, useEffect, useState } from 'react';
import { ButtonClose } from 'components/global/ButtonClose';
import Image from 'next/image';

export function PokecoinControls() {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [coins, setCoins] = useState<number>(0);

  function handleSubmitCalculation(formEvent: FormEvent) {
    formEvent.preventDefault();

    const h = Number(hours);
    const min = Number(minutes);

    const totalCoins = h * 6 + Math.floor(min * 0.1);

    if (totalCoins > 50) {
      setCoins(50);
    } else {
      setCoins(totalCoins);
    }
  }

  function resetTime() {
    setMinutes('');
    setHours('');
    setCoins(0);
  }

  useEffect(() => {
    if (Number(minutes) >= 60) {
      setMinutes('1');
      setHours((Number(hours) + 1).toString());
    } else if (Number(minutes) < 0) {
      setMinutes('59');
      setHours((Number(hours) - 1).toString());
    }
  }, [minutes]);

  useEffect(() => {
    if (Number(hours) > 23) {
      setHours('23');
    } else if (Number(hours) < 1) {
      setHours('');
    }
  }, [hours]);

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmitCalculation}
    >
      <div className="flex items-center justify-center w-fit gap-3">
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          inputMode="numeric"
          max={23}
          pattern="[0-9]*"
          placeholder="Hours..."
          className="w-[120px] h-16 flex items-center justify-center font-bold font-barlow p-2 rounded-bl-3xl rounded-tl-3xl text-2xl text-center text-gray-300 placeholder:font-roboto placeholder:text-base"
        />
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={'Minutes...'}
          className="w-[120px] h-16 flex items-center justify-center font-bold font-barlow p-2 rounded-br-3xl rounded-tr-3xl text-2xl text-center text-gray-300 placeholder:font-roboto placeholder:text-base"
        />
      </div>
      <ButtonClose onClick={resetTime} type="reset" />

      {/* <span className={}>Coins per day</span> */}
      <p className="text-white text-base lg:text-xl text-center">
        Click the Pokécoin to <br /> calculate the coins earned
      </p>

      <div className="flex w-fit items-center justify-center gap-4">
        <button
          className="w-28 h-28 lg:w-32 lg:h-32 transition filter bg-yellow-400 rounded-full shadow-yellow-100 hover:animate-glow "
          type="submit"
        >
          <Image
            width={200}
            height={200}
            src="/assets/pokecoin.png"
            alt="Pokecoin"
            draggable="false"
            unoptimized
          />
        </button>
        <strong
          key={coins}
          aria-label={`moedas: ${coins}, coins: ${coins}`}
          className="font-barlow text-8xl lg:text-9xl text-white drop-shadow-text-stroke shadow-gray-300 animate-fadeIn"
        >
          {coins}
        </strong>
      </div>
    </form>
  );
}
