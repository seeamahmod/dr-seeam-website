import photo from '../assets/images/about-doctors.png'
import { Eyebrow } from './ui.jsx'
import CountUp from './CountUp.jsx'

const STATS = [
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Individuals Assisted' },
  { value: 4.9, decimals: 1, label: 'Average Client Rating' },
  { value: 98, suffix: '%', label: 'Client Satisfaction Rate' },
]

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="about__inner">
        <div className="about__left">
          <div className="about__intro">
            <Eyebrow align="start">About me</Eyebrow>
            <div className="about__copy">
              <h2 className="about__title">Introducing Dr. Seeam</h2>
              <p className="about__text">
                Dr. Seeam is a certified clinical psychologist with expertise in cognitive behavioral
                therapy, anxiety management, and stress relief. With extensive experience, she has
                supported countless individuals in achieving improved mental health.
              </p>
            </div>
          </div>
          <div className="about__stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <CountUp className="stat__value" value={s.value} decimals={s.decimals} suffix={s.suffix} />
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about__photo">
          <img src={photo} alt="Doctor consulting with a patient" />
        </div>
      </div>
    </section>
  )
}
