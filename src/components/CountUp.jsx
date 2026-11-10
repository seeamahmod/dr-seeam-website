import { useEffect, useRef, useState } from 'react'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from 0 to `value` every time the number scrolls into view.
 * Once it has fully left the screen it resets to 0, ready to count again.
 * `decimals` keeps values like 4.9 formatted; `suffix` is "+", "%", etc.
 */
export default function CountUp({ value, decimals = 0, suffix = '', duration = 1000, className }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let played = false

    const run = () => {
      played = true
      if (reduceMotion) {
        setShown(value)
        return
      }
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        setShown(value * easeOutCubic(t))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5 && !played) {
          run() // at least half visible → count up
        } else if (!entry.isIntersecting && played) {
          // completely off screen → reset so the next visit counts again
          played = false
          cancelAnimationFrame(frame)
          if (!reduceMotion) setShown(0)
        }
      },
      { threshold: [0, 0.5] },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  const final = `${value.toFixed(decimals)}${suffix}`
  return (
    <span ref={ref} className={className} aria-label={final}>
      <span aria-hidden="true">
        {shown.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  )
}
