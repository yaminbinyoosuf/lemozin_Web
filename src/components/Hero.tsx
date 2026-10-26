import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from './Link'

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="shell hero__grid">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--light hero__eyebrow">
            <span>Women-focused driving mentorship</span>
            <span className="hero__eyebrow-place">
              <span className="eyebrow__dot" aria-hidden="true">
                ·
              </span>
              <span>Calicut</span>
            </span>
          </p>

          <h1 id="hero-heading" className="hero__title">
            Your Journey to
            <br />
            <span className="serif hero__title-accent">Confident Driving</span>
            <br />
            Starts Here.
          </h1>

          <p className="hero__lede">
            Learn, practise, and build confidence behind the wheel with personal
            driving guidance designed around your needs.
          </p>

          <div className="hero__actions">
            <Link className="btn btn--yellow" href="/book">
              Book a Lesson
              <ArrowUpRight size={17} strokeWidth={2.1} aria-hidden="true" />
            </Link>
            <a className="btn btn--ghost" href="#lessons">
              Explore Lessons
              <ArrowDown size={16} strokeWidth={1.9} aria-hidden="true" />
            </a>
          </div>

          <p className="hero__promise">
            Personal guidance. Practical experience. Greater confidence.
          </p>
        </div>

        <figure className="hero__figure">
          <div className="hero__media">
            <img
              src="/images/hero-1200.webp"
              srcSet="/images/hero-800.webp 800w, /images/hero-1200.webp 1200w, /images/hero-1600.webp 1600w"
              sizes="(max-width: 980px) 100vw, 46vw"
              width="1600"
              height="2000"
              alt="A woman driving through a city street with one hand on the steering wheel."
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="hero__caption">
            <span aria-hidden="true" />
            Personal guidance, from the driver&rsquo;s seat.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
