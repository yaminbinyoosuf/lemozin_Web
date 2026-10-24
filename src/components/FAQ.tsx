import { useRef, useState } from 'react'
import { Phone } from 'lucide-react'
import { faqs } from '../data/faq'
import { site } from '../data/site'

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)
  const listRef = useRef<HTMLDivElement>(null)

  function focusTrigger(direction: 1 | -1, currentIndex: number) {
    const triggers = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[data-faq-trigger]') ?? [],
    )
    if (triggers.length === 0) {
      return
    }
    const next = (currentIndex + direction + triggers.length) % triggers.length
    triggers[next]?.focus()
  }

  return (
    <section className="faq section" aria-labelledby="faq-heading">
      <div className="shell faq__grid">
        <div className="faq__intro">
          <p className="eyebrow">
            <span className="eyebrow__mark" aria-hidden="true" />
            05 — Before you begin
          </p>
          <h2 id="faq-heading" className="section-title">
            Questions Before You Begin?
          </h2>
          <p className="faq__note">
            If your question is not here, contact Lemozin directly by phone or WhatsApp.
          </p>
          <a className="faq__phone" href={site.phoneHref}>
            <Phone size={16} strokeWidth={1.8} aria-hidden="true" />
            {site.phoneDisplay}
          </a>
        </div>

        <div
          ref={listRef}
          className="faq__list"
          onKeyDown={(event) => {
            if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
              return
            }

            const triggers = Array.from(
              listRef.current?.querySelectorAll<HTMLButtonElement>('[data-faq-trigger]') ?? [],
            )
            const currentIndex = triggers.indexOf(document.activeElement as HTMLButtonElement)
            if (currentIndex < 0) {
              return
            }

            event.preventDefault()
            if (event.key === 'ArrowDown') {
              focusTrigger(1, currentIndex)
            } else if (event.key === 'ArrowUp') {
              focusTrigger(-1, currentIndex)
            } else if (event.key === 'Home') {
              triggers[0]?.focus()
            } else {
              triggers[triggers.length - 1]?.focus()
            }
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id
            const panelId = `faq-panel-${faq.id}`
            const buttonId = `faq-trigger-${faq.id}`

            return (
              <div key={faq.id} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <h3 className="faq-item__heading">
                  <button
                    id={buttonId}
                    type="button"
                    className="faq-item__trigger"
                    data-faq-trigger
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                  >
                    <span className="faq-item__index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="faq-item__question">{faq.question}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  className="faq-item__panel"
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                >
                  <div className="faq-item__panel-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
