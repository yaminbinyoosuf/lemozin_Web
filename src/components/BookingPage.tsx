import { ArrowLeft, ArrowUpRight, Info, Phone } from 'lucide-react'
import { BookingForm } from './BookingForm'
import { WhatsAppIcon } from './icons'
import type { LessonId } from '../data/lessons'
import { site } from '../data/site'
import { generalWhatsAppUrl } from '../lib/whatsapp'
import { Link } from './Link'

type BookingPageProps = {
  initialLesson: LessonId | ''
}

export function BookingPage({ initialLesson }: BookingPageProps) {
  return (
    <>
      <section className="booking-hero" aria-labelledby="booking-heading">
        <div className="shell booking-hero__grid">
          <div className="booking-hero__copy">
            <Link className="back-link" href="/">
              <ArrowLeft size={15} strokeWidth={1.9} aria-hidden="true" />
              Back to home
            </Link>

            <p className="eyebrow eyebrow--light">
              <span className="eyebrow__mark" aria-hidden="true" />
              Booking enquiry
            </p>

            <h1 id="booking-heading" className="booking-hero__title">
              Let&rsquo;s Plan Your
              <br />
              <span className="serif">Driving Lesson</span>
            </h1>

            <p className="booking-hero__lede">
              Choose your preferred lesson, date, and time. Send us your enquiry on
              WhatsApp, and we&rsquo;ll discuss availability with you.
            </p>

            <p className="booking-hero__note">
              <Info size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>
                Your selected date and time are preferences. The lesson is not
                confirmed until Lemozin responds.
              </span>
            </p>
          </div>

          <figure className="booking-hero__figure">
            <div className="booking-hero__media">
              <img
                src="/images/hero-1200.webp"
                srcSet="/images/hero-800.webp 800w, /images/hero-1200.webp 1200w, /images/hero-1600.webp 1600w"
                sizes="(max-width: 900px) 100vw, 40vw"
                width="1600"
                height="2000"
                alt="A woman driving through a city street with one hand on the steering wheel."
                decoding="async"
              />
            </div>
            <figcaption className="booking-hero__caption">
              Personal guidance. Practical experience.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="booking-section" aria-labelledby="booking-form-heading">
        <div className="shell booking-layout">
          <aside className="booking-aside">
            <p className="eyebrow">
              <span className="eyebrow__mark" aria-hidden="true" />
              Before you send
            </p>
            <h2 id="booking-form-heading" className="booking-aside__title">
              A simple WhatsApp enquiry.
            </h2>
            <p className="booking-aside__intro">
              Tell us a little about what you would like to practise. We&rsquo;ll use
              your preferred timing to discuss the next step with you.
            </p>

            <ol className="booking-steps">
              <li className="booking-step">
                <span className="booking-step__number" aria-hidden="true">
                  01
                </span>
                <p>Choose a lesson and your preferred date and time.</p>
              </li>
              <li className="booking-step">
                <span className="booking-step__number" aria-hidden="true">
                  02
                </span>
                <p>Send the completed enquiry through WhatsApp.</p>
              </li>
              <li className="booking-step">
                <span className="booking-step__number" aria-hidden="true">
                  03
                </span>
                <p>Lemozin replies to discuss availability.</p>
              </li>
            </ol>

            <div className="booking-aside__contact">
              <a href={site.phoneHref}>
                <Phone size={15} strokeWidth={1.8} aria-hidden="true" />
                Call {site.phoneDisplay}
              </a>
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Message on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <p className="booking-aside__note">
              You&rsquo;ll be redirected to WhatsApp to send your enquiry. Nothing is
              booked automatically.
            </p>
          </aside>

          <BookingForm key={initialLesson || 'any'} initialLesson={initialLesson} />
        </div>
      </section>

      <div className="booking-back">
        <div className="shell">
          <Link href="/">
            <ArrowLeft size={15} strokeWidth={1.9} aria-hidden="true" />
            Back to Lemozin
          </Link>
          <a className="booking-back__phone" href={site.phoneHref}>
            {site.phoneDisplay}
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  )
}
