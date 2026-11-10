import photo from '../assets/images/consultation.png'
import { SectionHeader } from './ui.jsx'

function InfoCard({ title, text }) {
  return (
    <article className="info-card">
      <h3 className="info-card__title">{title}</h3>
      <p className="info-card__text">{text}</p>
    </article>
  )
}

export default function Support() {
  return (
    <section className="section support">
      <SectionHeader
        eyebrow="Your support"
        title={
          <>
            You Deserve to Be <br />
            Emotionally Well
          </>
        }
        subtitle="We are a caring community of professionals committed to supporting you on your path to emotional health and resilience."
        subtitleWidth={622}
      />
      <div className="support__grid">
        <div className="support__col support__col--single">
          <InfoCard
            title="Confidentiality"
            text="Providing accessible mental health support to individuals from all backgrounds."
          />
        </div>
        <div className="support__col">
          <InfoCard
            title="Community"
            text="We cultivate a nurturing community where you can connect and share experiences."
          />
          <InfoCard
            title="Accessibility"
            text="Offering accessible mental health support to individuals from all walks of life."
          />
        </div>
        <div className="support__photo">
          <img src={photo} alt="Doctor talking with a patient across a desk" />
        </div>
      </div>
    </section>
  )
}
