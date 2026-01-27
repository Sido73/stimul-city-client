import './Hero.css'

interface HeroProps {
  onScrollTo: (id: string) => void
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-background">
        <img src="/hero-bg.jpg" alt="Background" className="hero-bg-image" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">ТОВ "СТИМУЛ-СІТІ"</h1>
        <p className="hero-subtitle">Інвестиції в нерухомість у Запоріжжі.</p>
        <div className="hero-buttons">
          <button className="btn btn-orange" onClick={() => onScrollTo('projects')}>НАШІ ПРОЕКТИ</button>
          <button className="btn btn-blue" onClick={() => onScrollTo('about')}>ДІЗНАТИСЯ ВІЛЬНЕ</button>
        </div>
      </div>
    </section>
  )
}
