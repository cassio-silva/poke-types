'use client';

import Image from 'next/image';
import types from '../../json/types.json';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ButtonClose } from 'components/global/ButtonClose';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export function PokemonTypeSelector() {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<[string, string]>([
    '',
    '',
  ]);
  const [isSelectorVisible, setIsSelectorVisible] = useState(true);

  function handleTypeSelection(type: string) {
    if (!selectedTypes[0] || (!!selectedTypes[0] && !!selectedTypes[1])) {
      setSelectedTypes([type, '']);
    }
    if (!!selectedTypes[0] && !selectedTypes[1]) {
      setSelectedTypes([selectedTypes[0], type]);
    }
    if (selectedTypes[0] === type || selectedTypes[1] === type) {
      resetTypes();
    }
  }

  function resetTypes() {
    setSelectedTypes(['', '']);
  }

  function toggleVisibility() {
    setIsSelectorVisible(!isSelectorVisible);
  }

  useEffect(() => {
    if (selectedTypes[0]) {
      router.push('/pokemon/type/' + selectedTypes.join('/'));
    } else {
      router.replace('/pokemon/1');
    }
  }, [selectedTypes]);

  return (
    <section className="flex flex-col mx-auto gap-3">
      <button
        className="flex w-fit gap-1 items-center justify-center mx-auto px-5 py-1 rounded-xl text-white text-lg font-roboto bg-teal-300"
        onClick={toggleVisibility}
        type="button"
      >
        Types
        <ChevronDownIcon
          className={`w-5 transition ${
            isSelectorVisible ? 'transform -rotate-180' : ''
          }`}
        />
      </button>
      <div
        aria-hidden={!isSelectorVisible}
        className={`w-fit h-fit max-h-[320px] grid grid-cols-[repeat(6,auto)] lg:grid-cols-9 place-items-center gap-1 mx-auto opacity-100 transition-[max-height_overflow_opacity] duration-500 delay-100 aria-hidden:opacity-0 aria-hidden:max-h-0 aria-hidden:overflow-hidden`}
      >
        {types.map((type) => (
          <button
            key={type.typeLabel.en}
            onClick={() => handleTypeSelection(type.typeLabel.en)}
            aria-expanded={selectedTypes.some(
              (_type) => _type === type.typeLabel.en
            )}
            className="group flex items-center justify-center relative w-[52px] h-[52px] lg:w-16 lg:h-16 bg-white rounded-full p-1 filter brightness-75 transition hover:brightness-100 aria-expanded:brightness-100 aria-expanded:shadow-[0_0_12px_3px_rgba(255,255,255,1)]"
            aria-label={type.typeLabel.en}
          >
            <Image
              width={80}
              height={80}
              quality={80}
              src={`/${type.img}`}
              alt={type.typeLabel.en}
            />
            {/* tooltip */}
            <span
              className={`hidden group-hover:block absolute -top-5 left-0 font-barlow text-sm text-white bg-gray-300 px-3 leading-5 rounded-full capitalize transition-opacity opacity-0 group-hover:opacity-100`}
            >
              {type.typeLabel.en}
            </span>
          </button>
        ))}
      </div>
      <ButtonClose
        onClick={resetTypes}
        disabled={Boolean(!selectedTypes[0] && !selectedTypes[1])}
        title="remove selection"
        aria-label="remove selection"
      />
    </section>
  );
}
