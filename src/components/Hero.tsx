import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { generalWhatsAppUrl } from '../lib/whatsapp'

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="shell hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <span className="eyebrow__mark" aria-hidden="true" />
            <span>Calicut, Kerala</span>
            <span className="eyebrow__dot" aria-hidden="true">
              ·
            </span>
            <span>Personal driving mentor</span>
          </p>

          <h1 id="hero-heading" className="hero__title">
            Find Your
            <br />
            <span className="serif hero__title-accent">Confidence</span>
            <br />
            on the Road.
          </h1>

          <p className="hero__lede">
            Personal driving guidance designed around your needs, your experience, and the
            confidence you want to build behind the wheel.
          </p>

          <div className="hero__actions">
            <a
              className="btn btn--primary"
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire about lessons
              <ArrowUpRight size={17} strokeWidth={2.1} aria-hidden="true" />
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </a>
            <a className="btn btn--quiet" href="#lessons">
              Explore lessons
              <ArrowDown size={16} strokeWidth={1.9} aria-hidden="true" />
            </a>
          </div>

          <div className="hero__scroll" aria-hidden="true">
            <span className="hero__scroll-line" />
            <span>Scroll</span>
          </div>
        </div>

        <figure className="hero__figure">
          <div className="hero__spine" aria-hidden="true">
            <span>Personal driving mentorship</span>
          </div>
          <div className="hero__media">
            <img
              src="/images/hero-1600.webp"
              srcSet="/images/hero-800.webp 800w, /images/hero-1200.webp 1200w, /images/hero-1600.webp 1600w"
              sizes="(max-width: 900px) 100vw, 48vw"
              width="1600"
              height="2133"
              alt="A driver's hands on the steering wheel during a practice drive through an Indian city."
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}
