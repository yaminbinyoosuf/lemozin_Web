export function BrandStatement() {
  return (
    <section className="statement" aria-labelledby="statement-heading">
      <div className="shell statement__inner">
        <p className="eyebrow statement__eyebrow">
          <span className="eyebrow__mark" aria-hidden="true" />
          01 — The philosophy
        </p>

        <h2 id="statement-heading" className="statement__title">
          Every driver starts somewhere.
          <span className="statement__second">
            Confidence grows with <span className="serif">practice.</span>
          </span>
        </h2>

        <div className="statement__foot" aria-hidden="true">
          <span>Patience</span>
          <span>Practice</span>
          <span>Progress</span>
        </div>
      </div>
    </section>
  )
}
