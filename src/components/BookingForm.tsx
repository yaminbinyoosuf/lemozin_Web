import { useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, ChevronDown, Phone } from 'lucide-react'
import { WhatsAppIcon } from './icons'
import { bookingLessonOptions, type LessonId } from '../data/lessons'
import { site } from '../data/site'
import { formatISODate, formatTime, getTodayISO } from '../lib/date'
import { buildBookingMessage, getWhatsAppUrl } from '../lib/whatsapp'

type ErrorField = 'name' | 'phone' | 'lesson' | 'date' | 'time' | 'specificTime'
type Errors = Partial<Record<ErrorField, string>>

type BookingFormProps = {
  initialLesson: LessonId | ''
}

const TIME_OPTIONS = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
  { value: 'specific', label: 'Specific time' },
] as const

const errorOrder: ErrorField[] = [
  'name',
  'phone',
  'lesson',
  'date',
  'time',
  'specificTime',
]

const errorFocusIds: Record<ErrorField, string> = {
  name: 'booking-name',
  phone: 'booking-phone',
  lesson: 'booking-lesson',
  date: 'booking-date',
  time: 'booking-time-morning',
  specificTime: 'booking-specific-time',
}

export function BookingForm({ initialLesson }: BookingFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [lesson, setLesson] = useState<string>(initialLesson)
  const [date, setDate] = useState('')
  const [timePreference, setTimePreference] = useState('')
  const [specificTime, setSpecificTime] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [minDate] = useState(getTodayISO)
  const specificTimeRef = useRef<HTMLInputElement>(null)

  function clearField(field: ErrorField) {
    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]
      return next
    })
    setWhatsappUrl('')
  }

  function validate(): Errors {
    const next: Errors = {}
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    if (!trimmedName) {
      next.name = 'Please enter your name.'
    }

    if (!trimmedPhone) {
      next.phone = 'Please enter your WhatsApp or phone number.'
    } else if (!/^[+()\d\s.-]+$/.test(trimmedPhone)) {
      next.phone =
        'Please use digits only, with an optional country code, spaces, or hyphens.'
    } else {
      const digitCount = trimmedPhone.replace(/\D/g, '').length

      if (digitCount < 10) {
        next.phone =
          'That number looks a little short. Please include your full phone number.'
      } else if (digitCount > 15) {
        next.phone = 'Please enter a phone number with no more than 15 digits.'
      }
    }

    if (!lesson) {
      next.lesson = 'Please choose a lesson type.'
    }

    if (!date) {
      next.date = 'Please choose a preferred date.'
    } else if (!formatISODate(date)) {
      next.date = 'Please enter a valid date.'
    } else if (date < getTodayISO()) {
      next.date = 'Please choose today or a future date.'
    }

    if (!timePreference) {
      next.time = 'Please choose a preferred time.'
    } else if (timePreference === 'specific') {
      if (!specificTime) {
        next.specificTime = 'Please enter a preferred time.'
      } else if (!/^\d{2}:\d{2}$/.test(specificTime)) {
        next.specificTime = 'Please enter a valid time.'
      }
    }

    return next
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate()
    const firstError = errorOrder.find((field) => nextErrors[field])

    if (firstError) {
      setErrors(nextErrors)
      setWhatsappUrl('')

      window.requestAnimationFrame(() => {
        const target = document.getElementById(errorFocusIds[firstError])
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches

        target?.scrollIntoView({
          block: 'center',
          behavior: reduceMotion ? 'auto' : 'smooth',
        })
        target?.focus({ preventScroll: true })
      })
      return
    }

    const lessonChoice = bookingLessonOptions.find((option) => option.value === lesson)
    const dateLabel = formatISODate(date)
    const timeLabel =
      timePreference === 'specific'
        ? `Specific time — ${formatTime(specificTime)}`
        : (TIME_OPTIONS.find((option) => option.value === timePreference)?.label ?? '')

    const message = buildBookingMessage({
      name: name.trim(),
      phone: phone.trim(),
      lessonType: lessonChoice?.label ?? '',
      preferredDate: dateLabel,
      preferredTime: timeLabel,
      additionalInfo: notes,
    })

    const url = getWhatsAppUrl(message)
    setErrors({})
    setWhatsappUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="booking-form" noValidate onSubmit={handleSubmit}>
      <div className="booking-form__head">
        <p className="eyebrow">
          <span className="eyebrow__mark" aria-hidden="true" />
          Booking enquiry
        </p>
        <h2 className="booking-form__title">Tell us what you have in mind.</h2>
        <p className="booking-form__required-note">
          Fields marked <span aria-hidden="true">*</span> are required.
        </p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label className="field__label" htmlFor="booking-name">
            Your Name <span className="field__required" aria-hidden="true">*</span>
          </label>
          <input
            className={`field__input${errors.name ? ' has-error' : ''}`}
            id="booking-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            value={name}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'booking-name-error' : undefined}
            onChange={(event) => {
              setName(event.target.value)
              clearField('name')
            }}
          />
          {errors.name && (
            <p className="field__error" id="booking-name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="booking-phone">
            WhatsApp or Phone Number{' '}
            <span className="field__required" aria-hidden="true">*</span>
          </label>
          <input
            className={`field__input${errors.phone ? ' has-error' : ''}`}
            id="booking-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Enter your phone number"
            value={phone}
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
            onChange={(event) => {
              setPhone(event.target.value)
              clearField('phone')
            }}
          />
          {errors.phone && (
            <p className="field__error" id="booking-phone-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="booking-lesson">
            Lesson Type <span className="field__required" aria-hidden="true">*</span>
          </label>
          <div className="select-wrap">
            <select
              className={`field__input field__select${errors.lesson ? ' has-error' : ''}`}
              id="booking-lesson"
              name="lesson"
              value={lesson}
              required
              aria-invalid={Boolean(errors.lesson)}
              aria-describedby={errors.lesson ? 'booking-lesson-error' : undefined}
              onChange={(event) => {
                setLesson(event.target.value)
                clearField('lesson')
              }}
            >
              <option value="" disabled>
                Select a lesson
              </option>
              {bookingLessonOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="select-wrap__icon"
              size={17}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </div>
          {errors.lesson && (
            <p className="field__error" id="booking-lesson-error" role="alert">
              {errors.lesson}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="booking-date">
            Preferred Date <span className="field__required" aria-hidden="true">*</span>
          </label>
          <input
            className={`field__input${errors.date ? ' has-error' : ''}`}
            id="booking-date"
            name="date"
            type="date"
            min={minDate}
            value={date}
            required
            aria-invalid={Boolean(errors.date)}
            aria-describedby={
              errors.date ? 'booking-date-error' : 'booking-date-hint'
            }
            onChange={(event) => {
              setDate(event.target.value)
              clearField('date')
            }}
          />
          {errors.date ? (
            <p className="field__error" id="booking-date-error" role="alert">
              {errors.date}
            </p>
          ) : (
            <p className="field__hint" id="booking-date-hint">
              {formatISODate(date) || 'Your date is a preference, not a confirmed booking.'}
            </p>
          )}
        </div>

        <fieldset
          className="field field--full field--time"
          aria-invalid={Boolean(errors.time)}
          aria-describedby={errors.time ? 'booking-time-error' : undefined}
        >
          <legend className="field__label">
            Preferred Time <span className="field__required" aria-hidden="true">*</span>
          </legend>
          <div className="time-options">
            {TIME_OPTIONS.map((option) => (
              <label
                className={`time-option${
                  timePreference === option.value ? ' is-selected' : ''
                }`}
                key={option.value}
              >
                <input
                  className="time-option__input"
                  id={`booking-time-${option.value}`}
                  type="radio"
                  name="preferredTime"
                  value={option.value}
                  checked={timePreference === option.value}
                  required
                  onChange={() => {
                    setTimePreference(option.value)
                    clearField('time')
                    clearField('specificTime')
                    if (option.value === 'specific') {
                      window.requestAnimationFrame(() =>
                        specificTimeRef.current?.focus(),
                      )
                    }
                  }}
                />
                <span className="time-option__mark" aria-hidden="true" />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          {timePreference === 'specific' && (
            <div className="specific-time">
              <label className="field__label field__label--small" htmlFor="booking-specific-time">
                Specific time <span className="field__required" aria-hidden="true">*</span>
              </label>
              <input
                ref={specificTimeRef}
                className={`field__input${errors.specificTime ? ' has-error' : ''}`}
                id="booking-specific-time"
                name="specificTime"
                type="time"
                value={specificTime}
                required
                aria-invalid={Boolean(errors.specificTime)}
                aria-describedby={
                  errors.specificTime ? 'booking-specific-time-error' : undefined
                }
                onChange={(event) => {
                  setSpecificTime(event.target.value)
                  clearField('specificTime')
                }}
              />
              {errors.specificTime && (
                <p className="field__error" id="booking-specific-time-error" role="alert">
                  {errors.specificTime}
                </p>
              )}
            </div>
          )}

          {errors.time && (
            <p className="field__error" id="booking-time-error" role="alert">
              {errors.time}
            </p>
          )}
        </fieldset>

        <div className="field field--full">
          <label className="field__label" htmlFor="booking-notes">
            Additional Information{' '}
            <span className="field__optional">(optional)</span>
          </label>
          <textarea
            className="field__input field__textarea"
            id="booking-notes"
            name="notes"
            rows={4}
            placeholder="Tell us about your experience or the type of practice you need."
            value={notes}
            onChange={(event) => {
              setNotes(event.target.value)
              setWhatsappUrl('')
            }}
          />
        </div>
      </div>

      <p className="form__redirect">
        You&rsquo;ll be redirected to WhatsApp to send your enquiry.
      </p>

      <button className="btn btn--purple btn--wide form__submit" type="submit">
        <WhatsAppIcon />
        Send booking enquiry on WhatsApp
      </button>

      <a className="form__call" href={site.phoneHref}>
        <Phone size={15} strokeWidth={1.8} aria-hidden="true" />
        Call {site.phoneDisplay}
      </a>

      {whatsappUrl && (
        <div className="form__status" role="status">
          <p>
            <strong>WhatsApp should have opened in a new tab.</strong> Please send
            the message there to complete your enquiry. Lemozin will confirm
            availability with you directly.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Open the WhatsApp message again
            <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      )}
    </form>
  )
}
