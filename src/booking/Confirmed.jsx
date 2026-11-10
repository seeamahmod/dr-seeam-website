import { Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import BookingFooter from './BookingFooter.jsx'
import badge from '../assets/icons/nucleo_icon_badge-check-glyph18-white.svg'
import mailIcon from '../assets/icons/nucleo_icon_envelope-outline18-blue.svg'
import plusIcon from '../assets/icons/nucleo_icon_plus-outline18.svg'
import calendarIcon from '../assets/icons/nucleo_icon_calendar-outline18-dark.svg'
import arrowRight from '../assets/icons/nucleo_icon_arrow-right-outline18-white-16.svg'
import { useBooking } from './BookingContext.jsx'
import { formatShort, fromKey, serviceById, typeById } from './data.js'
import { DoctorRow } from './parts.jsx'

/** Start/end of the appointment as Date objects in local time. */
function appointmentRange(dateKey, time, minutes) {
  const start = fromKey(dateKey)
  const [h, m] = time.split(':').map(Number)
  start.setHours(h, m, 0, 0)
  const end = new Date(start.getTime() + minutes * 60000)
  return [start, end]
}

const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

function googleCalendarUrl({ title, details, location, start, end }) {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details,
    location,
    dates: `${stamp(start)}/${stamp(end)}`,
  })
  return `https://calendar.google.com/calendar/render?${p}`
}

function downloadIcs({ title, details, location, start, end, uid }) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dr. Seeam//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${uid}@drseeam.com`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'dr-seeam-appointment.ics'
  a.click()
  URL.revokeObjectURL(url)
}

export default function Confirmed() {
  const { booking } = useBooking()
  if (!booking.reference) return <Navigate to="/book/review" replace />

  const service = serviceById(booking.serviceId)
  const type = typeById(booking.typeId)
  const [start, end] = appointmentRange(booking.date, booking.time, service.minutes)
  const event = {
    title: `${service.title} with Dr. Seeam`,
    details: `Booking reference ${booking.reference}`,
    location: type.location ? type.location.join(', ') : 'Online (video call)',
    start,
    end,
    uid: booking.reference,
  }
  const email = booking.details.email || 'your email'

  return (
    <div className="page booking-page">
      <Navbar solid />
      <main className="confirm-main">
        <div className="confirm">
          <section className="confirm__hero">
            <img src={badge} width="118" height="118" alt="" />
            <div className="confirm__hero-text">
              <h1>Booking Confirmed!</h1>
              <p>Your appointment has been successfully scheduled</p>
            </div>
          </section>
          <section className="confirm__card">
            <div className="confirm__ref">
              <span>Booking Reference</span>
              <strong>{booking.reference}</strong>
            </div>
            <DoctorRow />
            <dl className="confirm__facts">
              <div>
                <dt>Date</dt>
                <dd>{formatShort(booking.date)}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{booking.time}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{type.short}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{service.minutes} min</dd>
              </div>
            </dl>
            <div className="confirm__notice">
              <img src={mailIcon} width="18" height="18" alt="" />
              <div>
                <strong>Account Created</strong>
                <p>
                  We've sent your login details to {email}. Check your inbox to access your dashboard.
                </p>
              </div>
            </div>
            <div className="confirm__actions">
              <div className="confirm__cal">
                <a className="outline-btn" href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
                  <img src={plusIcon} width="16" height="16" alt="" />
                  Add to Google Calendar
                </a>
                <button className="outline-btn" type="button" onClick={() => downloadIcs(event)}>
                  <img src={calendarIcon} width="16" height="16" alt="" />
                  Add to Apple Calendar
                </button>
              </div>
              <Link className="solid-btn" to="/login">
                Go to Your Dashboard
                <img src={arrowRight} width="16" height="16" alt="" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <BookingFooter />
    </div>
  )
}
