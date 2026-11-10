import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import locationIcon from '../assets/icons/nucleo_icon_location-outline18-white-19.svg'
import videoIcon from '../assets/icons/nucleo_icon_video-outline18-white.svg'
import calendarIcon from '../assets/icons/nucleo_icon_calendar-outline18-white.svg'
import cardIcon from '../assets/icons/nucleo_icon_credit-card-outline18.svg'
import lockWhite from '../assets/icons/nucleo_icon_lock-outline18-white.svg'
import lockDark from '../assets/icons/nucleo_icon_lock-outline18-dark.svg'
import shieldIcon from '../assets/icons/nucleo_icon_shield-outline18-16.svg'
import paypal from '../assets/booking/paypal.svg'
import { useBooking } from './BookingContext.jsx'
import { formatLongYear, PRICE, serviceById, typeById } from './data.js'
import { Divider, DoctorRow, Pill, StepHeader, StepNav, SummaryCard } from './parts.jsx'

const makeReference = () =>
  'BK-' +
  Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('')

const formatCard = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()

const formatExpiry = (v) => {
  const digits = v.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

export default function StepReview() {
  const { booking, update } = useBooking()
  const navigate = useNavigate()
  const service = serviceById(booking.serviceId)
  const type = typeById(booking.typeId)
  const d = booking.details
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })

  const complete = () => {
    update({ reference: makeReference() })
    navigate('/book/confirmed')
  }

  return (
    <>
      <StepHeader title="Review & Pay" subtitle="Please review your booking details before completing payment" />
      <div className="step-row">
        <div className="step-col step-col--fill">
          <div className="review-row">
            <section className="review-card" aria-label="Booking details">
              <Pill size="lg">Booking summary</Pill>
              <DoctorRow />
              <Divider />
              <div className="review-items">
                <div className="review-item">
                  <span className="icon-circle icon-circle--40">
                    <img src={booking.typeId === 'online' ? videoIcon : locationIcon} width="19.2" height="19.2" alt="" />
                  </span>
                  <div className="review-item__text">
                    <span className="review-item__title">{service.title}</span>
                    <span className="review-item__meta">
                      <span>{type.id === 'online' ? 'Online consultation' : 'In-person consultation'}</span>
                      <span>•</span>
                      <span>{service.minutes} min</span>
                    </span>
                  </div>
                </div>
                <div className="review-item">
                  <span className="icon-circle icon-circle--40">
                    <img src={calendarIcon} width="19.2" height="19.2" alt="" />
                  </span>
                  <div className="review-item__text">
                    <span className="review-item__title">{formatLongYear(booking.date)}</span>
                    <span className="review-item__meta">
                      <span>{booking.time}</span>
                      <span>•</span>
                      <span>{timeZone}</span>
                    </span>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="review-contact">
                <span className="summary__label">{type.summary}</span>
                <span className="review-contact__name">{d.name || '—'}</span>
                <span className="review-contact__line">{d.email || '—'}</span>
                {d.phone && <span className="review-contact__line">{d.phone}</span>}
              </div>
              <Divider />
              <div className="review-notes">
                <span className="review-notes__label">Notes</span>
                <div className="review-notes__box">{d.notes || 'No notes added.'}</div>
              </div>
            </section>

            <section className="review-card" aria-label="Payment">
              <Pill size="lg">Payment system</Pill>
              <div className="summary__total">
                <span>Total</span>
                <span className="summary__price">${PRICE}</span>
              </div>
              <Divider />
              <div className="pay-with">
                <span className="pay-with__label">Pay with</span>
                <div className="pay-box">
                  <span className="pay-box__title">
                    <img src={cardIcon} width="18" height="18" alt="" />
                    Credit or Debit Card
                  </span>
                  <input
                    className="pay-input"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    aria-label="Card number"
                    placeholder="4242 4242 4242 4242"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                  />
                  <div className="pay-box__row">
                    <input
                      className="pay-input"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      aria-label="Expiry date"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                    />
                    <input
                      className="pay-input"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      aria-label="Security code"
                      placeholder="CVC"
                      value={card.cvc}
                      onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    />
                  </div>
                </div>
              </div>
              <div className="or-rule">
                <span />
                or
                <span />
              </div>
              <div className="pay-actions">
                <div className="pay-actions__buttons">
                  <button type="button" className="pay-btn pay-btn--paypal" onClick={complete} aria-label="Pay with PayPal">
                    <img src={paypal} width="50" height="14.118" alt="" />
                  </button>
                  <button type="button" className="pay-btn pay-btn--primary" onClick={complete}>
                    <img src={lockWhite} width="16" height="16" alt="" />
                    Pay ${PRICE}
                  </button>
                </div>
                <div className="pay-trust">
                  <span>
                    <img src={shieldIcon} width="16" height="16" alt="" />
                    Secure Payment
                  </span>
                  <span>
                    <img src={lockDark} width="16" height="16" alt="" />
                    SSL Encrypted
                  </span>
                </div>
              </div>
            </section>
          </div>
          <StepNav back="/book/details" onContinue={complete} />
        </div>
        <SummaryCard show={['service', 'type', 'datetime']} />
      </div>
    </>
  )
}
