import sky from '../assets/images/hero-sky.png'
import portrait from '../assets/images/doctor-portrait.png'
import { ArrowButton } from './ui.jsx'

export default function Hero() {
  return (
    <section className="hero-wrap">
      <div className="hero">
        <img className="hero__sky" src={sky} alt="" />
        <p className="hero__wordmark" aria-hidden="true">
          Dr. Seeam
        </p>
        <div className="hero__portrait">
          <img src={portrait} alt="Smiling Dr. Seeam in a white coat with a stethoscope" />
        </div>
        {/* Figma uses a *progressive* background blur (0 at the top → 8.5 at the bottom).
            CSS has no progressive blur, so it's built from stacked layers, each masked
            to start a little lower and blur a little more. */}
        <div className="hero__blur" aria-hidden="true">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className={`hero__blur-layer hero__blur-layer--${i}`} />
          ))}
        </div>
        <div className="hero__content">
          <h1 className="hero__title">Expert Mental Health Care, Your Way</h1>
          <p className="hero__text">
            Book your consultation with Dr. Seeam, a certified Clinical Psychologist with 15+ years of
            experience helping clients achieve better mental well-being.
          </p>
        </div>
        <ArrowButton variant="light" className="hero__cta">
          Book Appointment
        </ArrowButton>
      </div>
    </section>
  )
}
