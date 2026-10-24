import { useEffect, useState } from 'react'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

export function WhatsAppButton() {
  const [pastStart, setPastStart] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setPastStart(window.scrollY > Math.min(560, window.innerHeight * 0.7))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(Boolean(entry?.isIntersecting)),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  const visible = pastStart && !contactVisible

  return (
    <a
      className={`whatsapp-fab${visible ? ' is-visible' : ''}`}
      href={generalWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Lemozin on WhatsApp (opens in a new tab)"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <WhatsAppIcon />
      <span className="whatsapp-fab__label" aria-hidden="true">
        WhatsApp Lemozin
      </span>
    </a>
  )
}
