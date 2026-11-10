import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import BookingFooter from './BookingFooter.jsx'
import Stepper from './Stepper.jsx'
import { STEPS } from './data.js'

export default function BookingLayout() {
  const { pathname } = useLocation()
  const current = Math.max(
    0,
    STEPS.findIndex((s) => pathname.endsWith(`/${s.path}`)),
  )

  return (
    <div className="page booking-page">
      <Navbar solid />
      <Stepper current={current} />
      <main className="booking-main">
        <Outlet />
      </main>
      <BookingFooter />
    </div>
  )
}
