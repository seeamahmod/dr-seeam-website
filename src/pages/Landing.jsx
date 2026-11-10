import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Passion from '../components/Passion.jsx'
import Services from '../components/Services.jsx'
import About from '../components/About.jsx'
import Unique from '../components/Unique.jsx'
import Support from '../components/Support.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Faq from '../components/Faq.jsx'
import Cta from '../components/Cta.jsx'
import Footer from '../components/Footer.jsx'

export default function Landing() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero />
        <Passion />
        <Services />
        <About />
        <Unique />
        <Support />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
