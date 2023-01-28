import { useState, useEffect } from 'react'

function useOnScreen(ref: any, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      },
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    const refCurrent = ref.current
    return () => {
      if (refCurrent) {
        observer.unobserve(refCurrent)
      }
    }
  }, [])

  return isIntersecting
}

export default useOnScreen
