// Credit: https://dev.to/jmalvarez/check-if-an-element-is-visible-with-react-hooks-27h8

import { useEffect, useState } from "react"

export function useIsVisible(ref) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(ref.current)
  }, [ref])

  return isIntersecting
}
