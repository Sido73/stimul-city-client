import './Navigation.css'

interface NavigationProps {
  onScrollTo: (id: string) => void
}

export default function Navigation({ onScrollTo }: NavigationProps) {
  return (
    <nav className="main-nav">
      <div className="nav-content">
        <div className="logo">
          <div className="logo-icon">
            <img src="/logo.png" alt="СТИМУЛ-СІТІ" className="logo-image" />
          </div>
          <span className="logo-text">СТИМУЛ-СІТІ</span>
        </div>
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); onScrollTo('home') }} className="active">ГОЛОВНА</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); onScrollTo('about') }}>ПРО КОМПАНІЮ</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); onScrollTo('services') }}>ПОСЛУГИ</a></li>
          <li><a href="#projects" onClick={(e) => { e.preventDefault(); onScrollTo('projects') }}>ПРОЕКТИ</a></li>
          <li><a href="#contacts" onClick={(e) => { e.preventDefault(); onScrollTo('contacts') }}>КОНТАКТИ</a></li>
        </ul>
      </div>
    </nav>
  )
}
