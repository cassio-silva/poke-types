function Skeleton() {}

export default function PokemonSkeletonLoading() {
  const items = new Array(18).fill(null);

  return (
    <section className="w-11/12 mt-16 lg:w-fit grid grid-cols-3 md:grid-cols-4 desktop:grid-cols-[repeat(6,160px)] place-items-center gap-3 mx-auto pb-6 animate-fadeIn">
      {items?.map((_, index) => (
        <article
          key={index}
          className={`group flex w-full h-[148px] desktop:h-48 max-w-[160px] bg-gray-50 animate-pulse shadow-md shadow-gray-300 rounded rounded-bl-2xl rounded-tr-2xl p-[5px] `}
        >
          <div className="flex w-full h-full bg-gray-100 rounded rounded-bl-2xl rounded-tr-2xl" />
        </article>
      ))}
    </section>
  );
}
