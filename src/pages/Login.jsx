import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import BookingFooter from '../booking/BookingFooter.jsx'
import mailIcon from '../assets/icons/nucleo_icon_envelope-outline18-dark-16.svg'
import lockIcon from '../assets/icons/nucleo_icon_lock-outline18-dark.svg'
import arrowWhite from '../assets/icons/nucleo_icon_arrow-right-outline18-white-16.svg'
import arrowBlue from '../assets/icons/nucleo_icon_arrow-right-outline18-blue-16.svg'

const ROLES = ['Patient', 'Consultant']

export default function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState('Patient')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please enter your email and password.' })
      return
    }
    // No backend yet — this is where the sign-in request will go.
    setMessage({ type: 'info', text: `Sign-in as ${role.toLowerCase()} isn't connected to a server yet.` })
  }

  return (
    <div className="page booking-page">
      <Navbar solid />
      <main className="login-main">
        <form className="login" onSubmit={onSubmit} noValidate>
          <div className="login__head">
            <h1>Welcome Back</h1>
            <p>Sign in to access your account</p>
          </div>

          <div className="login__tabs" role="tablist" aria-label="Account type">
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={role === r}
                className={role === r ? 'is-active' : ''}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="login__field">
            <label htmlFor="login-email">Email</label>
            <div className="login__input">
              <img src={mailIcon} width="16" height="16" alt="" />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="demo@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="login__field">
            <label htmlFor="login-password">Password</label>
            <div className="login__input">
              <img src={lockIcon} width="16" height="16" alt="" />
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="login__actions">
            {message && (
              <p className={`login__msg login__msg--${message.type}`} role="status">
                {message.text}
              </p>
            )}
            <button className="solid-btn" type="submit">
              Sign in
              <img src={arrowWhite} width="16" height="16" alt="" />
            </button>
            <button className="text-btn" type="button" onClick={() => navigate(-1)}>
              <img className="flip-x" src={arrowBlue} width="16" height="16" alt="" />
              Go back
            </button>
          </div>
        </form>
      </main>
      <BookingFooter />
    </div>
  )
}
