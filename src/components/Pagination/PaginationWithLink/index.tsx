import Link from 'next/link';

export function PaginationWithLink({ currentPage }: { currentPage: number }) {
  const className =
    'flex flex-col items-center justify-center px-5 py-1 rounded-3xl text-white text-2xl font-bold animate-fadeIn bg-gradient-to-br from-lime-100 to-blue-300 hover:from-blue-100 hover:to-purple-200 shadow filter transtion disabled:brightness-90 disabled:grayscale-[50%] disabled:cursor-not-allowed';

  return (
    <div className="flex items-center gap-3 justify-center w-11/12 mx-auto mb-6">
      <Link
        href={currentPage <= 1 ? '' : `/pokemon/${currentPage - 1}`}
        className={className}
        aria-disabled={currentPage <= 1}
      >
        {'<'}
      </Link>
      <span className="text-white text-xl font-bold font-poppins">
        {currentPage}
      </span>
      <Link href={`/pokemon/${currentPage + 1}`} className={className}>
        {'>'}
      </Link>
    </div>
  );
}
