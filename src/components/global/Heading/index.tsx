import { ReactNode, createElement } from 'react'

interface HeadingProps {
  children: ReactNode
}

export function Heading({ children }: HeadingProps) {
  return (
    <h1 className="text-center lg:text-6xl text-4xl text-yellow-100 font-bold font-poppins mx-auto drop-shadow-text-stroke shadow-orange-400 mt-6">
      {children}
    </h1>
  )
}
