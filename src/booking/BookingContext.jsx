import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { toKey } from './data.js'

const STORAGE_KEY = 'dr-seeam-booking'

/** First bookable day: tomorrow, skipping Sundays. */
function firstAvailableDay() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  if (d.getDay() === 0) d.setDate(d.getDate() + 1)
  return toKey(d)
}

const initialState = () => ({
  serviceId: 'initial',
  typeId: 'in-person',
  date: firstAvailableDay(),
  time: '14:00',
  details: { name: '', email: '', confirmEmail: '', phone: '', notes: '' },
  reference: null,
})

function load() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
    if (saved && saved.serviceId) return { ...initialState(), ...saved }
  } catch {
    /* ignore unreadable storage */
  }
  return initialState()
}

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(load)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking))
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [booking])

  const value = useMemo(
    () => ({
      booking,
      update: (patch) => setBooking((b) => ({ ...b, ...patch })),
      updateDetails: (patch) => setBooking((b) => ({ ...b, details: { ...b.details, ...patch } })),
      reset: () => setBooking(initialState()),
    }),
    [booking],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
