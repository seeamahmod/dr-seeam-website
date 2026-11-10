import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import chevron from '../assets/icons/nucleo_icon_chevron-left-outline18.svg'
import clockIcon from '../assets/icons/nucleo_icon_clock-outline18.svg'
import selectedDot from '../assets/booking/selected-dot.svg'
import { useBooking } from './BookingContext.jsx'
import { formatLong, fromKey, SLOTS, toKey } from './data.js'
import { StepHeader, StepNav, SummaryCard } from './parts.jsx'

const WEEKDAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

/** 6×7 grid (or 5×7 when it fits) of dates for the month, padded with neighbouring days. */
function buildMonth(year, month) {
  const first = new Date(year, month, 1)
  const start = new Date(year, month, 1 - first.getDay())
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Math.ceil((first.getDay() + daysInMonth) / 7) * 7
  return Array.from({ length: cells }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function isBookable(d, today) {
  return d > today && d.getDay() !== 0 // future days, closed on Sundays
}

function SlotGroup({ label, slots, value, onPick }) {
  return (
    <div className="slot-group">
      <span className="slot-group__label">
        <img src={clockIcon} width="18" height="18" alt="" />
        {label}
      </span>
      <div className="slot-group__grid" role="radiogroup" aria-label={label}>
        {slots.map((s) => (
          <button
            key={s.value}
            type="button"
            role="radio"
            aria-checked={value === s.value}
            className={`slot ${value === s.value ? 'is-selected' : ''}`}
            onClick={() => onPick(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function StepSchedule() {
  const { booking, update } = useBooking()
  const navigate = useNavigate()
  // read the clock once per visit (lazy state initialiser), not on every render
  const [today] = useState(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  })

  const selected = fromKey(booking.date)
  const [view, setView] = useState({ y: selected.getFullYear(), m: selected.getMonth() })
  const days = useMemo(() => buildMonth(view.y, view.m), [view])
  const monthStart = useMemo(() => new Date(view.y, view.m, 1), [view])
  const monthName = monthStart.toLocaleDateString('en-US', { month: 'long' })
  const canGoBack = view.y > today.getFullYear() || (view.y === today.getFullYear() && view.m > today.getMonth())

  const shift = (delta) =>
    setView(({ y, m }) => {
      const d = new Date(y, m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })

  return (
    <>
      <StepHeader title="Pick a Date & Time" subtitle="Choose a day and time that works best for you" />
      <div className="step-row">
        <div className="step-col step-col--fill">
          <div className="schedule-row">
            <div className="calendar">
              <div className="calendar__head">
                <h2 className="calendar__month">
                  <span>{monthName}</span>
                  <span>{view.y}</span>
                </h2>
                <div className="calendar__nav">
                  <button type="button" aria-label="Previous month" onClick={() => shift(-1)} disabled={!canGoBack}>
                    <img src={chevron} width="24" height="24" alt="" />
                  </button>
                  <button type="button" aria-label="Next month" onClick={() => shift(1)}>
                    <img className="flip-x" src={chevron} width="24" height="24" alt="" />
                  </button>
                </div>
              </div>
              <div className="calendar__body">
                <div className="calendar__weekdays">
                  {WEEKDAYS.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                <div className="calendar__grid" role="grid" aria-label={`${monthName} ${view.y}`}>
                  {days.map((d) => {
                    const key = toKey(d)
                    const inMonth = d.getMonth() === view.m
                    const bookable = isBookable(d, today)
                    const isSel = key === booking.date
                    const label = String(d.getDate()).padStart(2, '0')
                    if (!inMonth) {
                      return (
                        <span key={key} className="day day--outside">
                          {d > monthStart ? label : ''}
                        </span>
                      )
                    }
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`day ${isSel ? 'is-selected' : ''} ${!bookable ? 'is-disabled' : ''}`}
                        disabled={!bookable}
                        aria-pressed={isSel}
                        aria-label={d.toDateString()}
                        onClick={() => update({ date: key })}
                      >
                        {label}
                        {isSel && <img className="day__dot" src={selectedDot} width="5" height="5" alt="" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="slots">
              <div className="slots__top">
                <h2 className="slots__date">{formatLong(booking.date)}</h2>
                <SlotGroup
                  label="Morning Sessions"
                  slots={SLOTS.morning}
                  value={booking.time}
                  onPick={(time) => update({ time })}
                />
              </div>
              <span className="slots__rule" />
              <SlotGroup
                label="Afternoon Sessions"
                slots={SLOTS.afternoon}
                value={booking.time}
                onPick={(time) => update({ time })}
              />
            </div>
          </div>
          <StepNav back="/book/type" onContinue={() => navigate('/book/details')} />
        </div>
        <SummaryCard show={['service', 'type', 'datetime']} />
      </div>
    </>
  )
}
