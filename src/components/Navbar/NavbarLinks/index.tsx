import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  href: string
}

export function NavbarLink({ children, href, className }: Props) {
  return (
    <Link
      className={
        `w-fit sm:w-full px-4 py-1 text-lg lg:text-2xl text-white font-roboto whitespace-nowrap brightness-75 hover:brightness-100 
        bg-gradient-to-br from-lime-100 to-blue-300 transition filter rounded-full ${className}`
      }
      href={href}
    >
      {children}
    </Link>
  )
}
