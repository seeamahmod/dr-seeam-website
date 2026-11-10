import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import BookingLayout from './booking/BookingLayout.jsx'
import StepService from './booking/StepService.jsx'
import StepType from './booking/StepType.jsx'
import StepSchedule from './booking/StepSchedule.jsx'
import StepDetails from './booking/StepDetails.jsx'
import StepReview from './booking/StepReview.jsx'
import Confirmed from './booking/Confirmed.jsx'
import { BookingProvider } from './booking/BookingContext.jsx'

/** Scroll to the top on page change, or to #section when the URL has a hash. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BookingProvider>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book" element={<BookingLayout />}>
          <Route index element={<Navigate to="service" replace />} />
          <Route path="service" element={<StepService />} />
          <Route path="type" element={<StepType />} />
          <Route path="schedule" element={<StepSchedule />} />
          <Route path="details" element={<StepDetails />} />
          <Route path="review" element={<StepReview />} />
        </Route>
        <Route path="/book/confirmed" element={<Confirmed />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BookingProvider>
  )
}
