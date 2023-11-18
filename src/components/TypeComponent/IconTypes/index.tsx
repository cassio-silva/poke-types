import Image from 'next/image'

export function IconTypes({ typeArray }: { typeArray: string[] }) {
  const arrayLength = typeArray.length

  if (arrayLength < 1) {
    return (
      <span className="text-lg text-gray-200 font-bold my-3">
        None
      </span>
    )
  }

  return (
    <div
      className={`${
        arrayLength < 3 ? 'flex flex-row' : 'grid grid-cols-3'
      } grid-flow-row gap-1 my-3 relative`}
    >
      {typeArray.map((item) => (
        <Image
          key={item}
          width={40}
          height={40}
          quality={100}
          src={`/assets/${item}.png`}
          alt={item}
        />
      ))}
    </div>
  )
}
