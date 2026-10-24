import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { Logo } from './Logo'
import { WhatsAppIcon } from './icons'
import { navItems, site } from '../data/site'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import { useActiveSection } from '../hooks/useActiveSection'

const navSectionIds = ['home', 'lessons', 'about', 'contact'] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(navSectionIds)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef(true)

  function closeMenu(restoreFocus = true) {
    restoreFocusRef.current = restoreFocus
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      return
    }

    const menu = menuRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusable = (): HTMLElement[] =>
      menu
        ? Array.from(
            menu.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((element) => element.offsetParent !== null)
        : []

    focusable()[0]?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu(true)
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const items = focusable()
      if (items.length === 0) {
        return
      }

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    const desktopQuery = window.matchMedia('(min-width: 1080px)')
    function onDesktop(event: MediaQueryListEvent) {
      if (event.matches) {
        closeMenu(false)
      }
    }
    desktopQuery.addEventListener('change', onDesktop)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktopQuery.removeEventListener('change', onDesktop)
      document.body.style.overflow = previousOverflow

      if (restoreFocusRef.current) {
        ;(previouslyFocused ?? triggerRef.current)?.focus()
      }
      restoreFocusRef.current = true
    }
  }, [open])

  return (
    <>
      <header className="site-header">
        <div className="shell site-header__inner">
          <a className="site-header__brand" href="#home" aria-label="Lemozin — home">
            <Logo />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <ul className="desktop-nav__list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    className={`desktop-nav__link${active === item.href.slice(1) ? ' is-active' : ''}`}
                    href={item.href}
                    aria-current={active === item.href.slice(1) ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <a
              className="btn btn--nav"
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire now
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </a>

            <button
              ref={triggerRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label="Open navigation menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} strokeWidth={1.8} aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            <div className="mobile-menu__top shell">
              <a
                className="site-header__brand"
                href="#home"
                aria-label="Lemozin — home"
                onClick={() => closeMenu(false)}
              >
                <Logo inverted />
              </a>
              <button
                type="button"
                className="mobile-menu__close"
                aria-label="Close navigation menu"
                onClick={() => closeMenu(true)}
              >
                <X size={22} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <nav className="mobile-menu__nav shell" aria-label="Mobile navigation">
              <ul>
                {navItems.map((item, index) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={() => closeMenu(false)}>
                      <span className="mobile-menu__num" aria-hidden="true">
                        0{index + 1}
                      </span>
                      <span>{item.label}</span>
                      <ArrowUpRight
                        className="mobile-menu__arrow"
                        size={22}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobile-menu__foot shell">
              <p className="mobile-menu__place">
                {site.location}
                <span>·</span>
                {site.descriptor}
              </p>
              <a
                className="btn btn--primary mobile-menu__cta"
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Start a WhatsApp conversation
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a className="mobile-menu__phone" href={site.phoneHref}>
                <Phone size={15} strokeWidth={1.8} aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
