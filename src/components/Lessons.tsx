import { ArrowUpRight } from 'lucide-react'
import { lessons } from '../data/lessons'
import { Link } from './Link'

export function Lessons() {
  return (
    <section id="lessons" className="lessons section" aria-labelledby="lessons-heading">
      <div className="shell">
        <header className="section-heading">
          <p className="eyebrow">
            <span className="eyebrow__mark" aria-hidden="true" />
            Driving lessons
          </p>
          <div className="section-heading__row">
            <h2 id="lessons-heading" className="section-heading__title">
              Find the Right
              <br />
              Practice <span className="serif">for You</span>
            </h2>
            <p className="section-heading__lede">
              Choose what you would like to work on, and contact Lemozin to discuss
              your lesson.
            </p>
          </div>
        </header>

        <ol className="lesson-list">
          {lessons.map((lesson, index) => (
            <li className="lesson-row" key={lesson.id}>
              <span className="lesson-row__number" aria-hidden="true">
                0{index + 1}
              </span>
              <div className="lesson-row__body">
                <h3 className="lesson-row__title">{lesson.title}</h3>
                <p className="lesson-row__description">{lesson.description}</p>
              </div>
              <Link className="lesson-row__action" href={`/book?lesson=${lesson.id}`}>
                <span>Book this lesson</span>
                <ArrowUpRight size={16} strokeWidth={1.9} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>

        <p className="lesson-list__note">
          Not sure where to begin? Choose{' '}
          <span>Not Sure Yet — Help Me Choose</span> in the booking form.
        </p>
      </div>
    </section>
  )
}
