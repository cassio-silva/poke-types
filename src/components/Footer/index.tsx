import { useWindowSize } from '../../hooks/useWindowSize'

export function Footer() {
  const { width } = useWindowSize()

  if (width && width <= 768) {
    return null
  }

  return <footer>rodapé</footer>
}
