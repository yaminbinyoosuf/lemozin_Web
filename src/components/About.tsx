import { ArrowUpRight } from 'lucide-react'
import { generalWhatsAppUrl } from '../lib/whatsapp'

export function About() {
  return (
    <section id="about" className="about section section--dark" aria-labelledby="about-heading">
      <div className="shell about__grid">
        <figure className="about__figure">
          <div className="about__media">
            <img
              src="/images/about-1200.webp"
              srcSet="/images/about-800.webp 800w, /images/about-1200.webp 1200w, /images/about-1600.webp 1600w"
              sizes="(max-width: 900px) 100vw, 50vw"
              width="1600"
              height="1068"
              alt="A learner driver and a mentor talking inside a car during a lesson."
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="about__caption">
            <span aria-hidden="true">↳</span> A good lesson starts with a conversation.
          </figcaption>
        </figure>

        <div className="about__copy">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__mark" aria-hidden="true" />
            03 — A more personal approach
          </p>

          <h2 id="about-heading" className="section-title section-title--light">
            Driving Is a Skill.
            <span className="about__title-second">
              <span className="serif">Confidence</span> Is Built.
            </span>
          </h2>

          <div className="about__text">
            <p>
              Learning to drive involves more than controlling a vehicle. It means developing
              awareness, judgement, and confidence in different road situations.
            </p>
            <p>
              Lemozin offers personal driving guidance for people who want to practise, improve,
              and become more comfortable behind the wheel.
            </p>
            <p>
              The focus is simple: understand your needs, work on the skills that matter, and take
              your driving journey one step at a time.
            </p>
          </div>

          <a
            className="text-link text-link--light"
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk to Lemozin about your goals
            <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden="true" />
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
