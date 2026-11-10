import { Link } from 'react-router-dom'
import logo from '../assets/icons/logo-37.svg'
import phoneIcon from '../assets/icons/nucleo_icon_phone-outline18.svg'
import mailIcon from '../assets/icons/nucleo_icon_envelope-outline18.svg'

const LINKS = ['Help Center', 'Contact Support', 'Training & Certification', 'Professional Services']

/** Full-width white footer used on the booking, confirmation and login pages (Figma 19:831). */
export default function BookingFooter() {
  return (
    <footer className="bfooter">
      <div className="bfooter__inner">
        <div className="bfooter__top">
          <div className="bfooter__about">
            <Link className="bfooter__brand" to="/">
              <img src={logo} width="36.82" height="36.82" alt="" />
              <span>Dr. Seeam</span>
            </Link>
            <p className="bfooter__text">
              Book your consultation with Dr. Seeam, a certified Clinical Psychologist with 15+ years of
              experience helping clients achieve better mental well-being.
            </p>
          </div>
          <div className="bfooter__cols">
            <div className="bfooter__col bfooter__col--links">
              <h2 className="bfooter__heading">Quick Links</h2>
              <ul className="bfooter__list">
                {LINKS.map((l) => (
                  <li key={l}>
                    <Link to="/">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bfooter__col">
              <h2 className="bfooter__heading">Contact Information</h2>
              <ul className="bfooter__list bfooter__list--contact">
                <li>
                  <img src={phoneIcon} width="18" height="18" alt="" />
                  <a href="tel:+15125550100">(512) 555-0100</a>
                </li>
                <li>
                  <img src={mailIcon} width="18" height="18" alt="" />
                  <a href="mailto:info@drseeam.com">info@drseeam.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="bfooter__line" />
        <div className="bfooter__bottom">
          <p>©2026 Dr. Seeam. All rights reserved.</p>
          <p>Serving Travis, Williamson, Hays, Bastrop &amp; Caldwell Counties</p>
        </div>
      </div>
      <p className="bfooter__watermark" aria-hidden="true">
        Dr. Seeam
      </p>
    </footer>
  )
}
