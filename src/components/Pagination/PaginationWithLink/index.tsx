import Link from 'next/link';

export function PaginationWithLink({ currentPage }: { currentPage: number }) {
  const className =
    'flex flex-col items-center justify-center box-border min-w-[3.5rem] px-5 py-1 rounded-3xl text-white text-2xl font-bold animate-fadeIn bg-gradient-to-br from-lime-100 to-blue-300 hover:from-blue-100 hover:to-purple-200 shadow filter transtion disabled:brightness-90 disabled:grayscale-[50%] disabled:cursor-not-allowed';

  return (
    <div className="flex items-center gap-3 justify-center w-11/12 mx-auto mb-6">
      <Link
        href={currentPage <= 1 ? '' : `/pokemon/${currentPage - 1}`}
        className={className}
        aria-disabled={currentPage <= 1}
      >
        {'<'}
      </Link>

      {/* <Link
        href={`/pokemon/${currentPage > 5 ? currentPage - 5 : 1}`}
        className={`text-white text-xl font-bold font-poppins mx-2 hover:underline hover:animate-[pulse_1s_ease-in-out_infinite] ${
          currentPage > 1 ? 'visible' : 'invisible'
        }`}
      >
        {currentPage > 5 ? currentPage - 5 : 1}
      </Link> */}
      {/* 
      <span
        className={`text-white text-base font-bold font-poppins ${
          currentPage > 5 ? 'visible' : 'invisible'
        }`}
      >
        ...
      </span> */}
      <span className="text-white text-xl font-bold font-poppins mx-3">
        {currentPage}
      </span>
      {/* <span className="text-white text-base font-bold font-poppins">...</span> */}
      {/* <Link
        href={`/pokemon/${currentPage + 5}`}
        className={`text-white text-xl font-bold font-poppins mx-2 hover:underline hover:animate-[pulse_1s_ease-in-out_infinite] ${
          currentPage < 29 ? 'visible' : 'invisible'
        }`}
      >
        {currentPage + 5}
      </Link> */}
      <Link href={`/pokemon/${currentPage + 1}`} className={className}>
        {'>'}
      </Link>
    </div>
  );
}
