type PaginationProps = {
  getNextPage: () => Promise<void>
  getPreviousPage: () => Promise<void>
  currentPage: number
}

export function Pagination({
  getNextPage,
  getPreviousPage,
  currentPage,
}: PaginationProps) {
  const className =
    'flex flex-col items-center justify-center px-5 py-1 rounded-3xl text-white text-2xl font-bold bg-gradient-to-br from-lime-100 to-blue-300 hover:from-blue-100 hover:to-purple-200 shadow filter transtion disabled:brightness-90 disabled:grayscale-[50%] disabled:cursor-not-allowed'
  return (
    <div className="flex items-center justify-center w-11/12 mx-auto">
      <button
        className={className}
        onClick={getPreviousPage}
        disabled={currentPage <= 1}
      >
        {'<'}
      </button>
      <span className="text-center font-Poppins font-bold text-white text-xl mx-4 w-6">
        {currentPage}
      </span>
      <button className={className} onClick={getNextPage}>
        {'>'}
      </button>
    </div>
  )
}
