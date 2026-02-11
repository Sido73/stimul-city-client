import { useState, useEffect } from 'react';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url: string;
  created_at: string;
}

export default function Projects() {
  // Дані проектів з правильними зображеннями
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'ЖК "Сонячний"',
      description: 'Сучасний житловий комплекс у центрі міста. Паркінг, дитячі майданчики, євроремонт.',
      category: 'Житлова нерухомість',
      // Реальне зображення житлового комплексу
      image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&auto=format',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'ТРЦ "Запорізький"',
      description: 'Торгово-розважальний центр площею 25 000 м². 150 магазинів, кінотеатр, фудкорт.',
      category: 'Комерційна нерухомість',
      // Реальне зображення торгового центру
      image_url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=600&fit=crop&auto=format',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Офісний центр "Бізнес-хаб"',
      description: 'Офісні приміщення класу А з видом на Дніпро. Конференц-зали, коворкінг, кафе.',
      category: 'Офісна нерухомість',
      // Реальне зображення офісного центру
      image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop&auto=format',
      created_at: new Date().toISOString()
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Отримання даних з API
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/projects')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          // Якщо API повертає свої зображення - використовуємо їх
          const projectsWithImages = data.map((project: Project, index: number) => ({
            ...project,
            // Якщо зображення з API - placeholder, замінюємо на реальні
            image_url: project.image_url && project.image_url.includes('placeholder.com') 
              ? getDefaultImage(project.category, project.title, index)
              : project.image_url
          }));
          setProjects(projectsWithImages);
        }
      })
      .catch(() => {
        console.log('API недоступен, використовуються тестові дані');
        // Використовуємо локальні дані, якщо API не доступне
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Функція для визначення зображення за категорією
  const getDefaultImage = (category: string, title: string, index: number) => {
    const categoryLower = category.toLowerCase();
    const titleLower = title.toLowerCase();
    
    if (categoryLower.includes('житлова') || titleLower.includes('жк') || titleLower.includes('сонячний')) {
      return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&auto=format';
    }
    if (categoryLower.includes('комерційна') || titleLower.includes('трц') || titleLower.includes('запорізький')) {
      return 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=600&fit=crop&auto=format';
    }
    if (categoryLower.includes('офісна') || titleLower.includes('офісний') || titleLower.includes('бізнес-хаб')) {
      return 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop&auto=format';
    }
    
    // Запасні зображення по індексу
    const defaultImages = [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop&auto=format'
    ];
    
    return defaultImages[index % defaultImages.length];
  };

  const handleLearnMore = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // Функція для відображення заголовку
  const formatTitle = (title: string) => {
    if (title.includes('ЖК')) return 'ЖИТЛОВИЙ КОМПЛЕКС';
    if (title.includes('ТРЦ')) return 'ТОРГОВО-РОЗВАЖАЛЬНИЙ ЦЕНТР';
    if (title.includes('Офісний')) return 'ОФІСНИЙ ЦЕНТР';
    return title.toUpperCase();
  };

  if (loading) {
    return (
      <section className="projects" id="projects">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Завантаження проектів...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <h2 className="section-title">НАШІ ПРОЕКТИ</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="project-image-img"
                  onError={(e) => {
                    // Якщо зображення не завантажилось
                    e.currentTarget.src = getDefaultImage(project.category, project.title, project.id);
                  }}
                />
              </div>
              <div className="project-content">
                <div className="project-category">{project.category}</div>
                <div className="project-title-bar">{formatTitle(project.title)}</div>
                <p className="project-description">{project.description}</p>
                
                <button 
                  className="project-button" 
                  onClick={() => handleLearnMore(project)}
                >
                  ДІЗНАТИСЯ БІЛЬШЕ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальне вікно */}
      {showModal && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <span className="modal-category">{selectedProject.category}</span>
            </div>

            <div className="modal-body">
              <img 
                src={selectedProject.image_url} 
                alt={selectedProject.title}
                className="modal-image"
              />
              
              <div className="modal-details">
                <h3>📋 Детальна інформація</h3>
                <p>{selectedProject.description}</p>
                
                <div className="modal-info">
                  <div className="info-item">
                    <strong>Категорія:</strong> {selectedProject.category}
                  </div>
                  <div className="info-item">
                    <strong>Дата створення:</strong> {new Date(selectedProject.created_at).toLocaleDateString('uk-UA')}
                  </div>
                  <div className="info-item">
                    <strong>ID проекту:</strong> {selectedProject.id}
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-contact" onClick={() => {
                    alert(`Зв'язок щодо проекту: ${selectedProject.title}`);
                    closeModal();
                  }}>
                    ✉️ Зв'язатися щодо проекту
                  </button>
                  
                  <button className="btn-close" onClick={closeModal}>
                    ❌ Закрити
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}