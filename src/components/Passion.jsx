import logo from '../assets/icons/logo-62.svg'

export default function Passion() {
  return (
    <section className="passion">
      <p className="passion__line passion__line--strong">
        With a passion for helping others achieve their full potential,
      </p>
      <p className="passion__row">
        <span className="passion__line passion__line--strong">I specialize</span>
        <img className="passion__logo" src={logo} width="62" height="62" alt="" />
        <span className="passion__line passion__line--soft">in creating a safe, non-judgmental space</span>
      </p>
      <p className="passion__line passion__line--soft">where clients can explore their thoughts, feelings.</p>
    </section>
  )
}
