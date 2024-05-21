type SelectProps = {
  itemsPerPage: number;
  type1: string;
  type2?: string;
  setItemsPerPage: (value: number) => void;
};

export function SelectItemsPerPage({
  itemsPerPage,
  type1,
  type2,
  setItemsPerPage,
}: SelectProps) {
  return (
    <div
      className="flex items-center justify-center w-3/4 desktop:w-1/4 mx-auto gap-3 aria-disabled:opacity-30"
      aria-disabled={Boolean(type1 || type2)}
    >
      <label
        htmlFor={'itemsPerPage'}
        className="text-white peer-disabled:opacity-30"
      >
        Items per page
      </label>
      <select
        id="itemsPerPage"
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        value={itemsPerPage}
        className="rounded text-base pl-1 cursor-pointer peer disabled:cursor-default"
        disabled={Boolean(type1 || type2)}
      >
        <option value={18}>18</option>
        <option value={36}>36</option>
        <option value={48}>48</option>
        <option value={72}>72</option>
        <option value={96}>96</option>
      </select>
    </div>
  );
}
