import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { BrandStatement } from './components/BrandStatement'
import { Lessons } from './components/Lessons'
import { About } from './components/About'
import { HowItWorks } from './components/HowItWorks'
import { FAQ } from './components/FAQ'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <BrandStatement />
        <Lessons />
        <About />
        <HowItWorks />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
