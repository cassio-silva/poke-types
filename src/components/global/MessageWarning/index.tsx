interface MessageWarningProps {
  messageType?: 'warning' | 'error'
  children: string
}

export function MessageWarning({
  children,
  messageType = 'warning',
}: MessageWarningProps) {
  if (messageType === 'error') {
    return (
      <p className="w-fit mx-auto mt-8 px-4 py-1 shadow-md bg-gradient-to-r from-red-200 to-red-500 text-white font-roboto font-semibold text-2xl rounded-xl animate-fadeIn">
        {children}
      </p>
    )
  }

  return (
    <p className="w-fit mx-auto mt-8 px-4 py-1 shadow-md bg-yellow-200 text-gray-300 font-roboto font-semibold text-2xl rounded-xl animate-fadeIn">
      {children}
    </p>
  )
}
