import Image from 'next/image';

export default function PokemonLoading() {
  return (
    <Image
      alt=""
      width={100}
      height={100}
      src="/spinner.png"
      className="mt-8 mx-auto animate-spin"
    />
  );
}
