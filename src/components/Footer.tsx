import { ArrowUpRight } from 'lucide-react'
import { Logo } from './Logo'
import { navItems, site } from '../data/site'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <a href="#home" aria-label="Lemozin — back to top" className="site-footer__logo">
              <Logo variant="stacked" loading="lazy" />
            </a>
            <p>
              Personal driving guidance in Calicut, Kerala. Practical practice for the situations
              that matter to you.
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <p className="site-footer__label">Explore</p>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <p className="site-footer__label">Get in touch</p>
            <a className="site-footer__phone" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <a
              className="site-footer__wa"
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              WhatsApp
              <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="site-footer__location">Calicut, Kerala</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} Lemozin. All rights reserved.</p>
          <p className="site-footer__descriptor">Personal Driving Mentor</p>
        </div>
      </div>
    </footer>
  )
}
