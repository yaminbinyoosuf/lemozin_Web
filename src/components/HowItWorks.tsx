const steps = [
  {
    number: '01',
    title: 'Start a Conversation',
    description: 'Tell Lemozin what you want to practise.',
  },
  {
    number: '02',
    title: 'Discuss Your Needs',
    description: 'Talk about your experience, goals, and preferred arrangements.',
  },
  {
    number: '03',
    title: 'Arrange Your Lesson',
    description:
      'Discuss availability and confirm the arrangements directly with Lemozin.',
  },
]

export function HowItWorks() {
  return (
    <section className="process section" aria-labelledby="process-heading">
      <div className="shell">
        <header className="section-head">
          <p className="eyebrow">
            <span className="eyebrow__mark" aria-hidden="true" />
            04 — Getting started
          </p>
          <div className="section-head__row">
            <h2 id="process-heading" className="section-title">
              A Simple Place to Start.
            </h2>
            <p className="section-head__lede">
              Tell Lemozin where you are, and where you would like to get to.
            </p>
          </div>
        </header>

        <ol className="process__steps">
          {steps.map((step) => (
            <li key={step.number} className="process-step">
              <span className="process-step__num" aria-hidden="true">
                {step.number}
              </span>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__desc">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="process__note">
          Availability and arrangements are confirmed directly with Lemozin.
        </p>
      </div>
    </section>
  )
}
