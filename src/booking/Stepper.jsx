import { Link } from 'react-router-dom'
import { STEPS } from './data.js'

/* Blue progress fill per step, taken from the Figma frames (0, 294, 555, 826, 1320 of 1320px). */
const FILL = ['0%', '22.27%', '42.05%', '62.58%', '100%']

export default function Stepper({ current }) {
  return (
    <div className="stepper">
      <div className="stepper__inner">
        <div
          className="stepper__track"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={current + 1}
          aria-label={`Step ${current + 1} of ${STEPS.length}`}
        >
          <span className="stepper__fill" style={{ width: FILL[current] }} />
        </div>
        <ol className="stepper__steps">
          {STEPS.map((step, i) => {
            const state = i < current ? 'done' : i === current ? 'current' : 'todo'
            const content = (
              <>
                <span className="stepper__num">{i + 1}</span>
                <span className="stepper__text">
                  <span className="stepper__title">{step.title}</span>
                  <span className="stepper__sub">{step.sub}</span>
                </span>
              </>
            )
            return (
              <li key={step.path} className={`stepper__step stepper__step--${state}`} aria-current={state === 'current' ? 'step' : undefined}>
                {state === 'done' ? (
                  <Link className="stepper__link" to={`/book/${step.path}`}>
                    {content}
                  </Link>
                ) : (
                  <span className="stepper__link">{content}</span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
