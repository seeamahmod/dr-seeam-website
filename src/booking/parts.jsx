import { Link } from 'react-router-dom'
import { GlowDot } from '../components/ui.jsx'
import doctorAvatar from '../assets/booking/doctor-avatar.png'
import clockIcon from '../assets/icons/nucleo_icon_clock-outline18.svg'
import arrowLeft from '../assets/icons/nucleo_icon_arrow-left-outline18.svg'
import arrowRight from '../assets/icons/nucleo_icon_arrow-right-outline18-white.svg'
import { formatLong, PRICE, serviceById, typeById } from './data.js'
import { useBooking } from './BookingContext.jsx'

/** Page heading used above each booking step. */
export function StepHeader({ title, subtitle }) {
  return (
    <header className="step-header">
      <h1 className="step-header__title">{title}</h1>
      <p className="step-header__sub">{subtitle}</p>
    </header>
  )
}

/** Grey pill with glowing dots ("Booking Summary", "Consultation", …). */
export function Pill({ children, size = 'md' }) {
  return (
    <span className={`pill pill--${size}`}>
      <GlowDot />
      <span>{children}</span>
      <GlowDot />
    </span>
  )
}

export function DoctorRow() {
  return (
    <div className="doctor-row">
      <img className="doctor-row__avatar" src={doctorAvatar} width="46" height="46" alt="" />
      <div className="doctor-row__text">
        <span className="doctor-row__name">Dr. Seeam</span>
        <span className="doctor-row__role">Clinical Psychologist</span>
      </div>
    </div>
  )
}

export function Duration({ minutes, size = 16 }) {
  return (
    <span className="duration" style={{ fontSize: size }}>
      <img src={clockIcon} width="18" height="18" alt="" />
      {minutes} min
    </span>
  )
}

export const Divider = () => <hr className="divider" />

/**
 * Right-hand "Booking Summary" card. It grows as the steps progress:
 * step 1 → service, step 2 → + type, step 3+ → + date & time.
 */
export function SummaryCard({ show = ['service'], wide = false }) {
  const { booking } = useBooking()
  const service = serviceById(booking.serviceId)
  const type = typeById(booking.typeId)

  return (
    <aside className={`summary ${wide ? 'summary--wide' : ''}`} aria-label="Booking summary">
      <Pill size="lg">Booking summary</Pill>
      <DoctorRow />
      <Divider />
      <div className="summary__block">
        <span className="summary__label">Service</span>
        <span className="summary__value">{service.title}</span>
        <Duration minutes={service.minutes} />
      </div>
      {show.includes('type') && (
        <>
          <Divider />
          <div className="summary__block">
            <span className="summary__label">Type</span>
            <span className="summary__value">{type.summary}</span>
          </div>
        </>
      )}
      {show.includes('datetime') && (
        <>
          <Divider />
          <div className="summary__block">
            <span className="summary__label">Date &amp; Time</span>
            <span className="summary__value">{formatLong(booking.date)}</span>
            <span className="summary__time">{booking.time}</span>
          </div>
        </>
      )}
      <Divider />
      <div className="summary__total">
        <span>Total</span>
        <span className="summary__price">${PRICE}</span>
      </div>
    </aside>
  )
}

/** Back / Continue row under each step. */
export function StepNav({ back, onContinue, continueLabel = 'Continue', disabled = false }) {
  return (
    <div className="step-nav">
      <Link className="step-btn step-btn--back" to={back}>
        <img src={arrowLeft} width="22" height="22" alt="" />
        Back
      </Link>
      <button className="step-btn step-btn--next" type="button" onClick={onContinue} disabled={disabled}>
        {continueLabel}
        <img src={arrowRight} width="22" height="22" alt="" />
      </button>
    </div>
  )
}
