import { useEffect, useRef } from 'react'

function useDebounce(fn: (...args: any[]) => void, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  const debouncedFn = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedFn
}

export default useDebounce