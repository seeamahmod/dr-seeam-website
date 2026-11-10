import { useState } from 'react'
import chevron from '../assets/icons/nucleo_icon_chevron-down-outline18.svg'
import { SectionHeader } from './ui.jsx'

const FAQS = [
  {
    q: 'What should I expect during my first consultation?',
    a: 'Your initial session is a chance for us to connect. We’ll talk about your concerns, objectives, and what you aim to achieve. This allows me to develop a customized treatment plan just for you.',
  },
  {
    q: 'How long do the sessions last?',
    a: 'Most sessions last between 45 minutes and 1 hour. Quick check-ups take about 20 minutes, while couples sessions and group workshops run 1.5 to 2 hours.',
  },
  {
    q: 'Do you provide online consultations?',
    a: 'Yes. Every service is available in person or through a secure, encrypted video call, so you can choose whatever feels most comfortable.',
  },
  {
    q: 'What is your policy on cancellations?',
    a: 'Please let us know at least 24 hours in advance if you need to cancel or reschedule, so the time can be offered to another client.',
  },
  {
    q: 'Is everything I share kept confidential?',
    a: 'Absolutely. Everything you share stays private, and all sessions comply with HIPAA regulations and feature full encryption.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq">
      <SectionHeader
        eyebrow="Common Questions"
        title={
          <>
            Frequently Asked <br />
            Questions
          </>
        }
        subtitle="Get answers to your questions about our services."
      />
      <div className="faq__list">
        {FAQS.map((item, i) => {
          const isOpen = open === i
          return (
            <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} key={item.q}>
              <button
                className="faq-item__question"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <img className="faq-item__chevron" src={chevron} width="24" height="24" alt="" />
              </button>
              <div className="faq-item__answer" id={`faq-answer-${i}`} role="region">
                <div className="faq-item__answer-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
