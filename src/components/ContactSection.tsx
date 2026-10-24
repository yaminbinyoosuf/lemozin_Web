import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { site } from '../data/site'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons'

export function ContactSection() {
  return (
    <section id="contact" className="contact section section--dark" aria-labelledby="contact-heading">
      <div className="shell">
        <header className="contact__head">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__mark" aria-hidden="true" />
            06 — Contact
          </p>

          <div className="contact__head-row">
            <h2 id="contact-heading" className="contact__title">
              Your Next Drive
              <span className="contact__title-second">
                <span className="serif">Starts</span> Here.
              </span>
            </h2>

            <div className="contact__intro">
              <p>
                Tell us what you want to work on. Let&rsquo;s discuss the right place to begin.
              </p>
              <div className="contact__actions">
                <a
                  className="btn btn--primary"
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Start a WhatsApp conversation
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a className="btn btn--outline-light" href={site.phoneHref}>
                  <Phone size={15} strokeWidth={1.9} aria-hidden="true" />
                  Call {site.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="contact__details">
          <a className="contact__detail contact__detail--phone" href={site.phoneHref}>
            <span className="contact__detail-label">Call directly</span>
            <span className="contact__phone">{site.phoneDisplay}</span>
            <ArrowUpRight
              className="contact__detail-arrow"
              size={20}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </a>

          <div className="contact__detail">
            <span className="contact__detail-label">
              <MapPin size={14} strokeWidth={1.8} aria-hidden="true" /> Based in
            </span>
            <span className="contact__detail-value">Calicut, Kerala</span>
          </div>

          <a
            className="contact__detail"
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact__detail-label">
              <WhatsAppIcon /> WhatsApp
            </span>
            <span className="contact__detail-value">{site.phoneDisplay}</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <figure className="contact__figure">
          <div className="contact__media">
            <img
              src="/images/place-1600.webp"
              srcSet="/images/place-800.webp 800w, /images/place-1200.webp 1200w, /images/place-1600.webp 1600w"
              sizes="(max-width: 900px) 100vw, 92vw"
              width="1600"
              height="1067"
              alt="A tree-lined road winding through green countryside in Kerala."
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="contact__caption">
            <span>The road ahead, at your pace.</span>
            <span>Kerala, India</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
