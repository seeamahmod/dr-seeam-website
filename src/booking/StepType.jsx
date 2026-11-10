import { useNavigate } from 'react-router-dom'
import videoIcon from '../assets/icons/nucleo_icon_video-outline18-white.svg'
import locationIcon from '../assets/icons/nucleo_icon_location-outline18-white.svg'
import featureCheck from '../assets/icons/nucleo_icon_circle-check-outline18-green.svg'
import checkOn from '../assets/icons/nucleo_icon_circle-check-glyph18-blue-24.svg'
import radioOff from '../assets/booking/radio-empty.svg'
import { useBooking } from './BookingContext.jsx'
import { MEETING_TYPES } from './data.js'
import { StepHeader, StepNav, SummaryCard } from './parts.jsx'

const ICONS = { online: videoIcon, 'in-person': locationIcon }

export default function StepType() {
  const { booking, update } = useBooking()
  const navigate = useNavigate()

  return (
    <>
      <StepHeader title="How would you like to meet?" subtitle="Choose your preferred consultation format" />
      <div className="step-row step-row--wide">
        <div className="step-col step-col--760">
          <div className="type-grid" role="radiogroup" aria-label="Consultation format">
            {MEETING_TYPES.map((t) => {
              const selected = booking.typeId === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`type-card ${selected ? 'is-selected' : ''}`}
                  onClick={() => update({ typeId: t.id })}
                >
                  <span className="icon-circle icon-circle--50">
                    <img src={ICONS[t.id]} width="24" height="24" alt="" />
                  </span>
                  <span className="type-card__body">
                    <span className="type-card__copy">
                      <span className="type-card__title">{t.title}</span>
                      <span className="type-card__text">{t.text}</span>
                    </span>
                    <span className="type-card__features">
                      {t.features.map((f) => (
                        <span className="type-card__feature" key={f}>
                          <img src={featureCheck} width="18" height="18" alt="" />
                          {f}
                        </span>
                      ))}
                    </span>
                  </span>
                  {t.location && (
                    <>
                      <span className="type-card__rule" />
                      <span className="type-card__location">
                        <span className="type-card__loc-label">Location</span>
                        <span className="type-card__loc-text">
                          {t.location[0]}
                          <br />
                          {t.location[1]}
                        </span>
                      </span>
                    </>
                  )}
                  {selected ? (
                    <img className="type-card__check" src={checkOn} width="24" height="24" alt="" />
                  ) : (
                    <img className="type-card__radio" src={radioOff} width="21.5" height="21.5" alt="" />
                  )}
                </button>
              )
            })}
          </div>
          <StepNav back="/book/service" onContinue={() => navigate('/book/schedule')} />
        </div>
        <SummaryCard show={['service', 'type']} wide />
      </div>
    </>
  )
}
