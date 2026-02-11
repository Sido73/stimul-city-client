import './Hero.css';

const Hero = () => {
  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>ТОВ "СТИМУЛ-СІТІ"</h1>
        <p>Інвестиції в нерухомість у Запоріжжі</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleScrollToProjects}>
            НАШІ ПРОЕКТИ
          </button>
          <button className="btn-secondary" onClick={handleScrollToServices}>
            ДІЗНАТИСЯ БІЛЬШЕ
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;