import clockIcon from '../assets/icons/nucleo_icon_clock-outline18.svg'
import { ArrowButton, GlowDot, SectionHeader } from './ui.jsx'

const SERVICES = [
  {
    id: 'initial',
    tag: 'Advisory Session',
    title: 'Introductory Advisory',
    text: 'An in-depth first meeting to assess your needs and develop a customized action plan.',
    duration: '1 hour',
  },
  {
    id: 'follow-up',
    tag: 'Counseling',
    title: 'Follow-Up Consultation',
    text: 'Regular session to continue your progress and evaluate your journey.',
    duration: '45 minutes',
  },
  {
    id: 'couples',
    tag: 'therapy',
    title: 'Couples Counseling',
    text: 'Collaborative session for couples to enhance communication and relationship dynamics.',
    duration: '1.5 hours',
  },
  {
    id: 'check-in',
    tag: 'Advisory',
    title: 'Quick Check-Up',
    text: 'Short session for medication review or quick progress assessment.',
    duration: '20 minutes',
  },
  {
    id: 'workshop',
    tag: 'Workshop',
    title: 'Group Workshop',
    text: 'Engaging group session focused on stress relief strategies.',
    duration: '2 hours',
  },
  {
    id: 'health',
    tag: 'Advisory Session',
    title: 'Health Advisory',
    text: 'In-depth first meeting to evaluate your needs and create a tailored action plan.',
    duration: '1 hour',
  },
]

export default function Services() {
  return (
    <section className="section services" id="services">
      <SectionHeader
        eyebrow="Services"
        title="Available Services"
        subtitle="Select from a variety of expert services designed just for you."
        subtitleWidth={382}
      />
      <div className="services__grid">
        {SERVICES.map((s) => (
          <article className="service-card" key={s.title}>
            <div className="service-card__head">
              <span className="tag">
                <GlowDot />
                <span className="tag__text">{s.tag}</span>
                <GlowDot />
              </span>
              <span className="service-card__price">$150</span>
            </div>
            <div className="service-card__body">
              <div className="service-card__copy">
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__text">{s.text}</p>
              </div>
              <div className="service-card__foot">
                <span className="service-card__duration">
                  <img src={clockIcon} width="18" height="18" alt="" />
                  {s.duration}
                </span>
                <ArrowButton variant="primary" to={`/book/service?service=${s.id}`}>
                  Schedule Now
                </ArrowButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
