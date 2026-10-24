import { useEffect, useState } from 'react'

/**
 * Highlights the navigation item for the section crossing the middle of the
 * viewport. Keeps Home active while the hero is on screen.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActive(visible.target.id)
        }
      },
      {
        rootMargin: '-38% 0px -52% 0px',
        threshold: [0, 0.05, 0.25, 0.5],
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [ids])

  return active
}
