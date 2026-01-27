import './Projects.css'

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <h2 className="section-title">НАШІ ПРОЕКТИ</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image">
              <img src="/project-1.jpg" alt="Бізнес-центр" className="project-image-img" />
            </div>
            <div className="project-title-bar">БІЗНЕС-ЦЕНТР</div>
          </div>
          <div className="project-card">
            <div className="project-image">
              <img src="/project-2.jpg" alt="Складський комплекс" className="project-image-img" />
            </div>
            <div className="project-title-bar">СКЛАДСЬКИЙ КОМПЛЕКС</div>
          </div>
          <div className="project-card">
            <div className="project-image">
              <img src="/project-3.jpg" alt="Торговий центр" className="project-image-img" />
            </div>
            <div className="project-title-bar">ТОРГОВИЙ ЦЕНТР</div>
          </div>
        </div>
      </div>
    </section>
  )
}
