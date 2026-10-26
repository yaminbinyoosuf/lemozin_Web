import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { navigate } from '../lib/router'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

/**
 * Internal link that swaps the page without adding a routing dependency.
 * Native anchors, modified clicks, and hash-only links keep their default
 * browser behaviour.
 */
export function Link({ href, onClick, ...props }: LinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !href.startsWith('/')
    ) {
      return
    }

    event.preventDefault()
    navigate(href)
  }

  return <a href={href} onClick={handleClick} {...props} />
}
