import { ArrowUpRight } from 'lucide-react'
import { lessons } from '../data/lessons'

export function Lessons() {
  return (
    <section id="lessons" className="lessons section" aria-labelledby="lessons-heading">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow">
            <span className="eyebrow__mark" aria-hidden="true" />
            02 — The experience
          </p>
          <div className="section-head__row">
            <h2 id="lessons-heading" className="section-title">
              Practice What Matters to You.
            </h2>
            <p className="section-head__lede">
              Focused driving practice for the situations you want to feel more comfortable
              handling.
            </p>
          </div>
        </header>

        <div className="lessons__grid">
          <figure className="lessons__figure">
            <div className="lessons__media">
              <img
                src="/images/lessons-1200.webp"
                srcSet="/images/lessons-800.webp 800w, /images/lessons-1200.webp 1200w, /images/lessons-1600.webp 1600w"
                sizes="(max-width: 900px) 100vw, 38vw"
                width="1600"
                height="2071"
                alt="A driver's hand resting on the steering wheel in warm evening light."
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="lessons__caption">
              <span className="lessons__caption-mark" aria-hidden="true" />
              Practice, at your pace.
            </figcaption>
          </figure>

          <ol className="lesson-list">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <a
                  className="lesson-row"
                  href={lesson.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="lesson-row__num" aria-hidden="true">
                    {lesson.number}
                  </span>
                  <span className="lesson-row__body">
                    <span className="lesson-row__title">{lesson.title}</span>
                    <span className="lesson-row__desc">{lesson.description}</span>
                    <span className="lesson-row__action">
                      Enquire about {lesson.title}
                      <ArrowUpRight size={15} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
