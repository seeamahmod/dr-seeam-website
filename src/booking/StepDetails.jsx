import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import videoIcon from '../assets/icons/nucleo_icon_video-outline18-white.svg'
import locationIcon from '../assets/icons/nucleo_icon_location-outline18-white.svg'
import { useBooking } from './BookingContext.jsx'
import { StepHeader, StepNav, SummaryCard } from './parts.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Field({ id, label, required, error, children, wide }) {
  return (
    <div className={`field ${wide ? 'field--wide' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && <span className="field__req"> *</span>}
      </label>
      {children}
      {error && (
        <span className="field__error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  )
}

export default function StepDetails() {
  const { booking, updateDetails } = useBooking()
  const navigate = useNavigate()
  const d = booking.details
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!d.name.trim()) e.name = 'Please enter your full name.'
    if (!EMAIL_RE.test(d.email)) e.email = 'Please enter a valid email address.'
    if (d.confirmEmail !== d.email) e.confirmEmail = 'Email addresses do not match.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onContinue = () => {
    if (validate()) navigate('/book/review')
    else document.querySelector('.field__input[aria-invalid="true"]')?.focus()
  }

  const bind = (key) => ({
    id: `f-${key}`,
    value: d[key],
    onChange: (ev) => {
      updateDetails({ [key]: ev.target.value })
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
    },
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `f-${key}-error` : undefined,
  })

  return (
    <>
      <StepHeader title="Your Details" subtitle="Tell us how we can reach you about your appointment" />
      <div className="step-row">
        <div className="step-col step-col--fill">
          <form
            className="details-card"
            noValidate
            onSubmit={(ev) => {
              ev.preventDefault()
              onContinue()
            }}
          >
            <span className="icon-circle icon-circle--50">
              <img src={booking.typeId === 'online' ? videoIcon : locationIcon} width="24" height="24" alt="" />
            </span>
            <div className="details-card__body">
              <div className="details-card__copy">
                <h2 className="details-card__title">Your Information</h2>
                <p className="details-card__text">Please provide your contact details for the appointment</p>
              </div>
              <div className="details-grid">
                <Field id="f-name" label="Full Name" required error={errors.name}>
                  <input className="field__input" type="text" autoComplete="name" placeholder="Enter your full name" {...bind('name')} />
                </Field>
                <Field id="f-email" label="Email Address" required error={errors.email}>
                  <input className="field__input" type="email" autoComplete="email" placeholder="Enter your email address" {...bind('email')} />
                </Field>
                <Field id="f-confirmEmail" label="Confirm Email Address" required error={errors.confirmEmail}>
                  <input className="field__input" type="email" autoComplete="email" placeholder="Enter your email address" {...bind('confirmEmail')} />
                </Field>
                <Field id="f-phone" label="Phone Number (optional)">
                  <input className="field__input" type="tel" autoComplete="tel" placeholder="+88013********" {...bind('phone')} />
                </Field>
                <Field id="f-notes" label="Notes (optional)" wide>
                  <textarea
                    className="field__input field__input--area"
                    placeholder="Any specific concerns or topics you'd like to discuss..."
                    {...bind('notes')}
                  />
                </Field>
              </div>
            </div>
            <button type="submit" hidden />
          </form>
          <StepNav back="/book/schedule" onContinue={onContinue} />
        </div>
        <SummaryCard show={['service', 'type', 'datetime']} />
      </div>
    </>
  )
}
