import Image from 'next/image'
import { IconTypes } from './IconTypes'

type TypeAdvantages = {
  pokeType: string
  img: string
  advantages: string[]
  disadvantages: string[]
  selectedType: string
  handleOpenType: () => void
}

export function TypeComponentCard({
  img,
  pokeType,
  advantages,
  disadvantages,
  selectedType,
  handleOpenType,
}: TypeAdvantages) {
  return (
    <button
      className={`relative flex flex-col justify-evenly items-center max-w-[140px] w-11/12 min-w-[160px] max-md:min-w-[140px] bg-[#FFF] border-0 rounded-full
         p-4 m-2 cursor-pointer transition duration-100 shadow-under hover:shadow-whiteLight`}
      onClick={handleOpenType}
    >
      <Image
        width={400}
        height={400}
        quality={100}
        src={`/${img}`}
        alt={pokeType}
        draggable="false"
        className="w-full"
      />
      {/* Card */}
      <div
        aria-expanded={selectedType === pokeType}
        className={`flex flex-col justify-start items-center 
          overflow-hidden absolute z-20 w-[120%] max-h-0 p-0 bg-white rounded-full shadow 
          aria-expanded:shadow-[0px_4px_6px_2px_rgba(0,0,0,0.3)] 
          transition-[max-height] ease-out duration-300 aria-expanded:max-h-[332px] aria-expanded:p-4 aria-expanded:rounded-md`}
      >
        <div className="flex flex-col justify-start items-center">
          <strong className="flex flex-row text-2xl text-gray-300 capitalize">
            {pokeType}
          </strong>
          <span className="w-full bg-gradient-to-r from-lime-100 from-10% to-60% to-teal-200 font-bold text-sm text-white px-2 rounded-full whitespace-nowrap">
            Strong Against
          </span>
          <IconTypes typeArray={advantages} />

          <span className="w-full bg-gradient-to-r from-red-100 from-10% to-60% to-magenta-500 font-bold text-sm text-white px-2 rounded-full whitespace-nowrap">
            Weak Against
          </span>
          <IconTypes typeArray={disadvantages} />
          <span className="text-sm text-gray-100">
            {'< Tap to close >'}
          </span>
        </div>
      </div>
    </button>
  )
}
