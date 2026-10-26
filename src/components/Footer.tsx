import { Logo } from './Logo'
import { WhatsAppIcon } from './icons'
import { navItems, site } from '../data/site'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import { Link } from './Link'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href="/" aria-label="Lemozin — home" className="site-footer__logo">
              <Logo variant="stacked" inverted />
            </Link>
            <p>
              Personal driving mentorship for women in Calicut, Kerala. Practical
              guidance, at your pace.
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <p className="site-footer__label">Explore</p>
            <ul>
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link href={'href' in item ? item.href : `/#${item.section}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <p className="site-footer__label">Contact</p>
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__whatsapp"
            >
              <WhatsAppIcon />
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p>{site.location}</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {currentYear} Lemozin. All rights reserved.</p>
          <p>Calicut, Kerala · Photography is illustrative.</p>
        </div>
      </div>
    </footer>
  )
}
