import './App.css'
import TopBar from './components/TopBar'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="app">
      <TopBar />
      <Navigation onScrollTo={handleScrollTo} />
      <Hero onScrollTo={handleScrollTo} />
      <Services />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
