import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/icons/logo-25.svg'
import menuIcon from '../assets/icons/nucleo_icon_menu-outline18.svg'
import closeIcon from '../assets/icons/nucleo_icon_xmark-outline18.svg'
import { ArrowButton } from './ui.jsx'

const LINKS = [
  { label: 'Home', to: '/#home' },
  { label: 'About', to: '/#about' },
  { label: 'Service', to: '/#services' },
  { label: 'Review', to: '/#reviews' },
]

/** `solid` renders the white bar used on the booking and login pages. */
export default function Navbar({ solid = false }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => window.innerWidth > 768 && setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <div className={`navbar-shell ${solid ? 'navbar-shell--solid' : ''}`}>
      <nav className={`navbar ${open ? 'navbar--open' : ''}`} id="home">
        <button
          className="navbar__toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <img src={open ? closeIcon : menuIcon} width="22" height="22" alt="" />
        </button>

        <ul className="navbar__links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link to={link.to} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link className="navbar__brand" to="/" aria-label="Dr. Seeam home">
          <img src={logo} width="25.041" height="25.041" alt="" />
          <span>Dr. Seeam</span>
        </Link>

        <ArrowButton variant="primary" className="navbar__cta" to="/login">
          Join now
        </ArrowButton>
      </nav>
    </div>
  )
}
