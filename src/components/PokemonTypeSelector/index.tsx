'use client';

import Image from 'next/image';
import Link from 'next/link';
import types from '../../json/types.json';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type SelectorProps = {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
};

export function PokemonTypeSelector({
  params,
}: {
  params: { types: Array<string> };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedTypes, setSelectedTypes] = useState<[string, string]>([
    '',
    '',
  ]);

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

  useEffect(() => {
    router.push('/pokemon/type/' + selectedTypes.join('/'));

    if (!selectedTypes[0] && !selectedTypes[1] && pathname.includes('/type')) {
      router.replace('/pokemon/1');
    }
  }, [selectedTypes]);

  return (
    <section className="w-fit h-fit grid grid-cols-[repeat(6,auto)] lg:grid-cols-9 place-items-center gap-1 mx-auto transition-all">
      {types.map((type) => (
        <button
          key={type.typeLabel.en}
          onClick={() => handleTypeSelection(type.typeLabel.en)}
          // aria-expanded={
          //   type.typeLabel.en === type1 || type.typeLabel.en === type2
          // }
          aria-expanded={selectedTypes.some(
            (_type) => _type === type.typeLabel.en
          )}
          className="group flex items-center justify-center relative w-[52px] h-[52px] lg:w-16 lg:h-16 bg-white rounded-full p-1 filter brightness-75 transition hover:brightness-100 aria-expanded:brightness-100 aria-expanded:shadow-[0_0_12px_3px_rgba(255,255,255,1)]"
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
    </section>
  );
}
