import logo from '../assets/icons/logo-35.svg'
import bigLogo from '../assets/icons/logo-250.svg'
import phoneIcon from '../assets/icons/nucleo_icon_phone-outline18.svg'
import mailIcon from '../assets/icons/nucleo_icon_envelope-outline18.svg'
import line from '../assets/images/footer-line.svg'

const QUICK_LINKS = ['Support Center', 'Reach Out for Help', 'Training & Credentials', 'Professional Services']

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="footer">
        <div className="footer__top">
          <div className="footer__about">
            <a className="footer__brand" href="#home">
              <img src={logo} width="35.194" height="35.194" alt="" />
              <span>Dr. Seeam</span>
            </a>
            <p className="footer__text">
              Book your consultation with Dr. Seeam Albright, a licensed Clinical Psychologist with over 15
              years of experience helping clients enhance their mental well-being.
            </p>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <h3 className="footer__heading">Quick Access</h3>
              <ul className="footer__list">
                {QUICK_LINKS.map((l) => (
                  <li key={l}>
                    <a href="#home">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <h3 className="footer__heading">Contact Details</h3>
              <ul className="footer__list footer__list--contact">
                <li>
                  <img src={phoneIcon} width="18" height="18" alt="" />
                  <a href="tel:+15125550200">(512) 555-0200</a>
                </li>
                <li>
                  <img src={mailIcon} width="18" height="18" alt="" />
                  <a href="mailto:info@drseeam.com">info@drseeam.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <img className="footer__line" src={line} width="1280" height="1" alt="" />
        <div className="footer__bottom">
          <p>©2026 Dr. Seeam. All rights reserved.</p>
          <p>Serving the Greater Springfield Area.</p>
        </div>
        <div className="footer__watermark" aria-hidden="true">
          <img src={bigLogo} width="249.721" height="249.721" alt="" />
          <span>Dr. Seeam</span>
        </div>
      </div>
    </footer>
  )
}
