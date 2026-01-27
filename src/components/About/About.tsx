import './About.css'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <div className="about-text">
          <h2 className="section-title">ПРО НАС</h2>
          <p>
            ТОВ "СТИМУЛ-СІТІ" - надійний партнер у сфері нерухомості. Ми спеціалізуємося 
            на управлінні нерухомістю та пропонуємо вигідні рішення для наших клієнтів.
          </p>
          <p>
            Наша компанія має багаторічний досвід роботи на ринку нерухомості Запоріжжя. 
            Ми допомагаємо клієнтам знайти найкращі інвестиційні можливості та забезпечуємо 
            професійне управління їх майном.
          </p>
        </div>
        <div className="about-image">
          <img src="/about.jpg" alt="Про нас" className="about-image-img" />
        </div>
      </div>
    </section>
  )
}
