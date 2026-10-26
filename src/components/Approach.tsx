const steps = [
  {
    title: 'Tell us what you would like to practise.',
    description:
      'Share your experience and the situations you want to feel more comfortable with.',
  },
  {
    title: 'Choose your preferred date and time.',
    description:
      'Send your enquiry on WhatsApp with the lesson and timing that suit you.',
  },
  {
    title: 'Confirm the details with Lemozin.',
    description:
      'Availability is discussed and confirmed with you directly.',
  },
]

const approachPoints = [
  'Personal driving guidance.',
  'Practical skills and everyday situations.',
  'A welcoming, confidence-building experience.',
]

export function Approach() {
  return (
    <section id="about" className="approach" aria-labelledby="approach-heading">
      <div className="shell approach__grid">
        <figure className="approach__figure">
          <div className="approach__media">
            <img
              src="/images/approach-1200.webp"
              srcSet="/images/approach-800.webp 800w, /images/approach-1200.webp 1200w, /images/approach-1600.webp 1600w"
              sizes="(max-width: 900px) 100vw, 46vw"
              width="1600"
              height="1200"
              alt="Two women talking together inside a car before a drive."
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="approach__caption">
            <span aria-hidden="true">↳</span> A good lesson starts with a conversation.
          </figcaption>
        </figure>

        <div className="approach__copy">
          <p className="eyebrow">
            <span className="eyebrow__mark" aria-hidden="true" />
            A more personal approach
          </p>
          <h2 id="approach-heading" className="approach__title">
            Learn at Your Pace.
            <br />
            <span className="serif">Drive with Confidence.</span>
          </h2>
          <p className="approach__body">
            Every learner has different goals. Lemozin offers women-focused driving
            guidance for those who want to practise essential skills, become more
            comfortable on the road, and take their driving journey one step at a time.
          </p>
          <ul className="approach__points">
            {approachPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="process-band">
        <div className="shell process">
          <div className="process__head">
            <p className="eyebrow">
              <span className="eyebrow__mark" aria-hidden="true" />
              How it works
            </p>
            <h2 id="process-heading" className="process__title">
              Getting started
              <br />
              is simple.
            </h2>
          </div>

          <ol className="process__steps" aria-labelledby="process-heading">
            {steps.map((step, index) => (
              <li className="process-step" key={step.title}>
                <span className="process-step__number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__description">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
