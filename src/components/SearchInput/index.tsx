import { InputHTMLAttributes } from 'react'

export function SearchInput({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      className={`w-full max-w-3xl h-11 text-lg text-gray-200 px-4 border-[3px] border-solid border-transparent 
      rounded-[50px] transition duration-[300ms] focus:border-yellow-100 outline-none 
      placeholder:text-gray-200 placeholder:text-lg placeholder:font-roboto placeholder:text-center placeholder:font-bold 
      focus:placeholder:text-gray-100`}
      type="text"
      placeholder={'Filter...'}
    />
  )
}
