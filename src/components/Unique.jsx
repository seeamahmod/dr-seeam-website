import heartIcon from '../assets/icons/nucleo_icon_heart-outline18.svg'
import shieldIcon from '../assets/icons/nucleo_icon_shield-outline18.svg'
import checkIcon from '../assets/icons/nucleo_icon_check-double-outline18.svg'
import dna from '../assets/images/dna.png'
import { SectionHeader } from './ui.jsx'

const FEATURES = [
  {
    icon: heartIcon,
    title: 'Empathetic Support',
    text: 'Every client receives individualized attention and sincere compassion throughout their experience.',
  },
  {
    icon: shieldIcon,
    title: 'Safe & Secure',
    text: 'Your confidentiality is crucial. All sessions comply with HIPAA regulations and feature full encryption.',
  },
  {
    icon: checkIcon,
    title: 'Demonstrated Success',
    text: 'Over 500 clients supported with a 98% satisfaction rate across all services.',
  },
]

/**
 * Every card is white; hovering (or focusing) a card switches it to the
 * "Safe & Secure" look from Figma — light blue, DNA artwork, white icon chip.
 */
export default function Unique() {
  return (
    <section className="section unique">
      <SectionHeader
        eyebrow="Why choose me"
        title="What Makes Me Unique"
        subtitle="Committed to delivering outstanding care with a tailored approach."
        subtitleWidth={382}
      />
      <div className="unique__grid">
        {FEATURES.map((f) => (
          <article className="feature" key={f.title} tabIndex={0}>
            <div className="feature__dna" aria-hidden="true">
              <img src={dna} alt="" />
            </div>
            <div className="feature__fade feature__fade--top" aria-hidden="true" />
            <div className="feature__fade feature__fade--bottom" aria-hidden="true" />
            <span className="feature__icon" aria-hidden="true">
              {/* the Nucleo SVG is used as a mask so its colour can change on hover */}
              <span className="feature__glyph" style={{ '--icon': `url("${f.icon}")` }} />
            </span>
            <div className="feature__body">
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__text">{f.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
