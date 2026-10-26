import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { Logo } from './Logo'
import { WhatsAppIcon } from './icons'
import { navItems, site } from '../data/site'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import { Link } from './Link'
import { useActiveSection } from '../hooks/useActiveSection'

const navSectionIds = ['home', 'lessons', 'about'] as const

type HeaderProps = {
  isHome: boolean
}

export function Header({ isHome }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(navSectionIds, isHome)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  function closeMenu() {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      return
    }

    const menu = menuRef.current
    const trigger = triggerRef.current
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
        closeMenu()
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

    const desktopQuery = window.matchMedia('(min-width: 981px)')
    function onDesktop(event: MediaQueryListEvent) {
      if (event.matches) {
        closeMenu()
      }
    }
    desktopQuery.addEventListener('change', onDesktop)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktopQuery.removeEventListener('change', onDesktop)
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [open])

  const sectionHref = (section: string) => (isHome ? `#${section}` : `/#${section}`)

  return (
    <>
      <header className="site-header">
        <div className="shell site-header__inner">
          <Link className="site-header__brand" href="/" aria-label="Lemozin — home">
            <Logo />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <ul className="desktop-nav__list">
              {navItems.map((item) =>
                'href' in item ? (
                  <li key={item.label}>
                    <Link
                      className={`desktop-nav__link desktop-nav__link--book${
                        !isHome ? ' is-active' : ''
                      }`}
                      href={item.href}
                      aria-current={!isHome ? 'page' : undefined}
                    >
                      {item.label}
                      <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                    </Link>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      className={`desktop-nav__link${
                        isHome && active === item.section ? ' is-active' : ''
                      }`}
                      href={sectionHref(item.section)}
                      aria-current={
                        isHome && active === item.section ? 'location' : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="site-header__actions">
            <Link className="mobile-book" href="/book">
              Book a Lesson
            </Link>
            <button
              ref={triggerRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label="Open navigation menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={19} strokeWidth={1.8} aria-hidden="true" />
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
              <Link
                className="site-header__brand"
                href="/"
                aria-label="Lemozin — home"
                onClick={closeMenu}
              >
                <Logo inverted />
              </Link>
              <button
                type="button"
                className="mobile-menu__close"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <X size={22} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <nav className="mobile-menu__nav shell" aria-label="Mobile navigation">
              <ul>
                {navItems.map((item, index) =>
                  'href' in item ? (
                    <li key={item.label}>
                      <Link
                        className="mobile-menu__link mobile-menu__link--book"
                        href={item.href}
                        aria-current={!isHome ? 'page' : undefined}
                        onClick={closeMenu}
                      >
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
                      </Link>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        className="mobile-menu__link"
                        href={sectionHref(item.section)}
                        aria-current={
                          isHome && active === item.section ? 'location' : undefined
                        }
                        onClick={closeMenu}
                      >
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
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="mobile-menu__foot shell">
              <p className="mobile-menu__place">
                {site.location}
                <span aria-hidden="true">·</span>
                {site.descriptor}
              </p>
              <a className="mobile-menu__phone" href={site.phoneHref}>
                <Phone size={15} strokeWidth={1.8} aria-hidden="true" />
                {site.phoneDisplay}
              </a>
              <a
                className="btn btn--yellow mobile-menu__cta"
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Message on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
