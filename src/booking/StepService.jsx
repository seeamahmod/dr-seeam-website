import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import checkOn from '../assets/icons/nucleo_icon_circle-check-glyph18-blue.svg'
import checkOff from '../assets/icons/nucleo_icon_circle-check-outline18-grey.svg'
import { useBooking } from './BookingContext.jsx'
import { PRICE, SERVICES } from './data.js'
import { Duration, Pill, StepHeader, StepNav, SummaryCard } from './parts.jsx'

export default function StepService() {
  const { booking, update } = useBooking()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  // "Schedule Now" on the landing page passes ?service=<id>
  const preselect = params.get('service')
  useEffect(() => {
    if (preselect && SERVICES.some((s) => s.id === preselect)) update({ serviceId: preselect })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselect])

  return (
    <>
      <StepHeader title="Select a Service" subtitle="Choose the type of consultation that best fits your needs" />
      <div className="step-row step-row--wide">
        <div className="step-col step-col--760">
          <div className="option-list" role="radiogroup" aria-label="Service">
            {SERVICES.map((s) => {
              const selected = booking.serviceId === s.id
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`service-option ${selected ? 'is-selected' : ''}`}
                  onClick={() => update({ serviceId: s.id })}
                >
                  <span className="service-option__main">
                    <Pill size="sm">{s.tag}</Pill>
                    <span className="service-option__body">
                      <span className="service-option__copy">
                        <span className="service-option__title">{s.title}</span>
                        <span className="service-option__text">{s.text}</span>
                      </span>
                      <Duration minutes={s.minutes} />
                    </span>
                  </span>
                  <span className="service-option__price">
                    ${PRICE}
                    <img src={selected ? checkOn : checkOff} width="24" height="24" alt="" />
                  </span>
                </button>
              )
            })}
          </div>
          <StepNav back="/" onContinue={() => navigate('/book/type')} />
        </div>
        <SummaryCard show={['service']} wide />
      </div>
    </>
  )
}
