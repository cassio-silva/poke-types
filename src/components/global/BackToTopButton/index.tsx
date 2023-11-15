'use client'

import { useEffect, useState } from 'react'
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid'

export function ButtonBackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  
  function handleScroll() {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.body.scrollHeight

    if (documentHeight / 3 - windowHeight / 3 <= 0) {
      return
    }

    if (scrollPosition > documentHeight / 3 - windowHeight / 3) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  function handleBackToTop() {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  useEffect(() => {
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      data-visible={isVisible}
      className={`hidden fixed data-[visible=true]:block animate-fadeIn bottom-20 lg:bottom-6 right-4 border-2 rounded-lg border-white 
      text-white bg-gradient-to-br from-yellow-300 to-orange-300 `}
      onClick={handleBackToTop}
    >
      <ChevronDoubleUpIcon className="w-10 h-10" />
    </button>
  )
}
