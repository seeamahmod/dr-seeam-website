import dots from '../assets/images/cta-dots.svg'
import { ArrowButton } from './ui.jsx'

export default function Cta() {
  return (
    <section className="cta-wrap" id="book">
      <div className="cta">
        <img className="cta__dots" src={dots} width="1576" height="931" alt="" />
        <div className="cta__content">
          <div className="cta__copy">
            <h2 className="cta__title">Ready to Start Your Journey?</h2>
            <p className="cta__text">
              Take the first step towards improved mental health. Schedule your consultation today and
              embark on your wellness journey.
            </p>
          </div>
          <ArrowButton variant="light-lg">Schedule a free call</ArrowButton>
        </div>
      </div>
    </section>
  )
}
