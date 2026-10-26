import { useEffect, useRef } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Lessons } from './components/Lessons'
import { Approach } from './components/Approach'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { BookingPage } from './components/BookingPage'
import { isLessonId } from './data/lessons'
import { useRoute } from './lib/router'

const siteOrigin = 'https://lemozin.example'

const pageMeta = {
  home: {
    title: 'Lemozin | Women-Focused Driving Mentorship in Calicut',
    description:
      'Personal, women-focused driving mentorship in Calicut, Kerala. Explore city driving, parking practice, highway driving, and refresher lessons, then send a booking enquiry on WhatsApp.',
  },
  booking: {
    title: 'Book a Driving Lesson | Lemozin',
    description:
      'Send a driving lesson enquiry to Lemozin in Calicut, Kerala. Choose a lesson, preferred date and time, then continue on WhatsApp to confirm availability.',
  },
} as const

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )
  element?.setAttribute('content', content)
}

function updatePageMeta(isBooking: boolean) {
  const meta = isBooking ? pageMeta.booking : pageMeta.home
  const path = isBooking ? '/book' : '/'

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', `${siteOrigin}${path}`)
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)

  document.head
    .querySelector<HTMLLinkElement>('link[rel="canonical"]')
    ?.setAttribute('href', `${siteOrigin}${path}`)
}

function App() {
  const route = useRoute()
  const isBooking = route.pathname === '/book'
  const selectedLesson = new URLSearchParams(route.search).get('lesson')
  const initialLesson = isLessonId(selectedLesson) ? selectedLesson : ''
  const routeKey = `${route.pathname}${route.search}${route.hash}`
  const previousRouteKey = useRef(routeKey)

  useEffect(() => {
    updatePageMeta(isBooking)
  }, [isBooking])

  useEffect(() => {
    // Let the app own scroll position so a history entry cannot restore the
    // middle of a long page over a fresh route.
    window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    const routeChanged = previousRouteKey.current !== routeKey
    previousRouteKey.current = routeKey

    if (route.hash) {
      const target = document.getElementById(route.hash.slice(1))
      if (target) {
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches

        window.requestAnimationFrame(() => {
          target.scrollIntoView({
            block: 'start',
            behavior: reduceMotion ? 'auto' : 'smooth',
          })
        })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    if (routeChanged) {
      document.getElementById('main')?.focus({ preventScroll: true })
    }
  }, [route.hash, routeKey])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header isHome={!isBooking} />
      <main id="main" tabIndex={-1}>
        {isBooking ? (
          <BookingPage initialLesson={initialLesson} />
        ) : (
          <>
            <Hero />
            <Lessons />
            <Approach />
            <ContactSection />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
