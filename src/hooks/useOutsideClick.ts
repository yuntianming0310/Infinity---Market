import { useEffect, useRef, RefObject } from 'react'

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  listenCapturing: boolean = true
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(
    function () {
      function handleClick(e: MouseEvent): void {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler()
        }
      }

      document.addEventListener('click', handleClick, listenCapturing)

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing)
    },
    [handler, listenCapturing]
  )

  return ref
}
