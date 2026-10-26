import { useEffect, useState } from 'react'

export type Route = {
  pathname: string
  search: string
  hash: string
}

function normalisePath(pathname: string): string {
  if (pathname === '/') {
    return '/'
  }

  return pathname.replace(/\/+$/, '')
}

export function getRoute(): Route {
  return {
    pathname: normalisePath(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash,
  }
}

export function navigate(href: string) {
  const target = new URL(href, window.location.href)

  if (target.origin !== window.location.origin) {
    window.location.href = href
    return
  }

  window.history.pushState({}, '', `${target.pathname}${target.search}${target.hash}`)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(getRoute)

  useEffect(() => {
    function onPopState() {
      setRoute(getRoute())
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return route
}
