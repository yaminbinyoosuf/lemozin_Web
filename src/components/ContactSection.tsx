import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { site } from '../data/site'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import { Link } from './Link'

export function ContactSection() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="shell">
        <div className="contact__top">
          <div className="contact__head">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow__mark" aria-hidden="true" />
              Contact
            </p>
            <h2 id="contact-heading" className="contact__title">
              Ready When
              <br />
              <span className="serif">You Are.</span>
            </h2>
          </div>

          <div className="contact__side">
            <p className="contact__lede">
              Tell us what you would like to practise, and we&rsquo;ll discuss the
              right place to begin.
            </p>
            <div className="contact__actions">
              <Link className="btn btn--yellow" href="/book">
                Book a Lesson
                <ArrowUpRight size={17} strokeWidth={2.1} aria-hidden="true" />
              </Link>
              <a className="btn btn--ghost" href={site.phoneHref}>
                <Phone size={16} strokeWidth={1.8} aria-hidden="true" />
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="contact__details">
          <div className="contact-detail">
            <p className="contact-detail__label">Call</p>
            <a className="contact-detail__value" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
          </div>
          <div className="contact-detail">
            <p className="contact-detail__label">WhatsApp</p>
            <a
              className="contact-detail__value"
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message Lemozin
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="contact-detail">
            <p className="contact-detail__label">Location</p>
            <p className="contact-detail__value">
              <MapPin size={15} strokeWidth={1.8} aria-hidden="true" />
              {site.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
