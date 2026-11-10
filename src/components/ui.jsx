import { Link } from 'react-router-dom'
import arrowDark16 from '../assets/icons/nucleo_icon_arrow-up-right-dark-16.svg'
import arrowWhite18 from '../assets/icons/nucleo_icon_arrow-up-right-white-18.svg'
import arrowWhite20 from '../assets/icons/nucleo_icon_arrow-up-right-white-20.svg'
import dotGlow from '../assets/icons/dot-glow.svg'

/**
 * Pill button with a trailing arrow chip, in the three sizes used by the design.
 *  - "primary" : blue, 42px tall, white 30px chip with a dark 16px arrow (navbar / service cards)
 *  - "light"   : white, 48px tall, blue 36px chip with a white 18px arrow (hero)
 *  - "light-lg": white, 56px tall, blue 42px chip with a white 20px arrow (CTA)
 */
const ARROWS = {
  primary: { src: arrowDark16, size: 16 },
  light: { src: arrowWhite18, size: 18 },
  'light-lg': { src: arrowWhite20, size: 20 },
}

export function ArrowButton({ children, variant = 'primary', to = '/book/service', className = '' }) {
  const arrow = ARROWS[variant]
  return (
    <Link className={`btn btn--${variant} ${className}`} to={to}>
      <span className="btn__label">{children}</span>
      <span className="btn__chip" aria-hidden="true">
        <img src={arrow.src} width={arrow.size} height={arrow.size} alt="" />
      </span>
    </Link>
  )
}

/** "// Label //" eyebrow used above section titles. */
export function Eyebrow({ children, align = 'center' }) {
  return (
    <div className={`eyebrow eyebrow--${align}`}>
      <span className="eyebrow__slash">//</span>
      <span className="eyebrow__text">{children}</span>
      <span className="eyebrow__slash">//</span>
    </div>
  )
}

/** Centered section header: eyebrow + title + subtitle. */
export function SectionHeader({ eyebrow, title, subtitle, subtitleWidth }) {
  return (
    <header className="section-header">
      <div className="section-header__top">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="section-title">{title}</h2>
      </div>
      {subtitle && (
        <p className="section-subtitle" style={subtitleWidth ? { maxWidth: subtitleWidth } : undefined}>
          {subtitle}
        </p>
      )}
    </header>
  )
}

/** Small blue dot with a soft glow, used inside tag pills. */
export function GlowDot() {
  return (
    <span className="glow-dot" aria-hidden="true">
      <img src={dotGlow} width="23.6" height="23.6" alt="" />
    </span>
  )
}
