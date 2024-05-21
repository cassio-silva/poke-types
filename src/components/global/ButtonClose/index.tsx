import { ButtonHTMLAttributes } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface ButtonCloseProps {
  onClick: (value?: any) => any;
  disabled: boolean;
}

export function ButtonClose({
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="flex mx-auto h-fit w-fit rounded-full bg-white shadow-md group disabled:cursor-not-allowed"
      type="button"
    >
      <XCircleIcon className="w-9 h-9 text-red-400 group-disabled:text-gray-100" />
    </button>
  );
}
