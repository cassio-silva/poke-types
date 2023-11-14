import { ReactNode } from "react"

interface MessageWarningProps {
  isErrorMessage?: boolean
  children: ReactNode
}

export function MessageWarning({
  children,
  isErrorMessage = false,
}: MessageWarningProps) {
  const className = 'w-fit max-w-[95%] text-lg text-center mx-auto mt-8 px-4 py-1 shadow-md font-roboto font-semibold rounded-xl animate-fadeIn'
  if (isErrorMessage) {
    return (
      <p className={`${className} bg-gradient-to-br from-red-200 to-red-500 text-white`}>
        {children}
      </p>
    )
  }

  return (
    <p className={`${className} bg-yellow-300 text-gray-300`}>
      {children}
    </p>
  )
}
