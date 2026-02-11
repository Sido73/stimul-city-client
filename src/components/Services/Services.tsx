import { useState, useEffect } from "react";
import "./Services.css";
import type { ServiceCardType } from '../../types/ServiceCard.type';

// Інтерфейс для послуги з API
interface ApiService {
  id: number; // ЧИСЛО з API!
  title: string;
  description: string;
  icon: string;
  price: string;
}

// Додаємо пропс
interface ServicesProps {
  onAddToCart: (service: ServiceCardType) => void;
}

export default function Services({ onAddToCart }: ServicesProps) {
  const [apiServices, setApiServices] = useState<ApiService[]>([]);
  const [activeCard, setActiveCard] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Отримання даних з API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/services');
        
        if (!response.ok) {
          throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }
        
        const data: ApiService[] = await response.json();
        console.log('API Services loaded:', data); // ДЕБАГ
        setApiServices(data);
        setError(null);
      } catch (err) {
        console.error('Помилка завантаження послуг з API:', err);
        setError('API недоступне. Використовуються локальні дані.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSelectCard = (id: string) => {
    setActiveCard(activeCard === id ? "" : id);
  };

  const clearSelection = () => {
    setActiveCard("");
  };

  // ВИПРАВЛЕНА функція для додавання до кошика
  const addToCart = (service: ServiceCardType) => {
    console.log('Services: adding to cart:', service); // ДЕБАГ
    
    // Переконуємося, що id є рядком
    const serviceWithStringId = {
      ...service,
      id: String(service.id) // КОНВЕРТУЄМО В РЯДОК
    };
    
    // Викликаємо функцію з App.tsx
    onAddToCart(serviceWithStringId);
    
    // Візуальний фідбек
    alert(`Послугу "${service.title}" додано до кошика за ${service.price}`);
    
    // Відправити на сервер (якщо API працює) - ВИДАЛИТИ, якщо не потрібно
    /*
    const serviceId = parseInt(service.id);
    if (!isNaN(serviceId)) {
      fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          quantity: 1
        })
      }).catch(err => console.error('Помилка додавання до кошика на сервері:', err));
    }
    */
  };

  // Локальні дані (якщо API не працює)
  const localCards: ServiceCardType[] = [
    {
      id: "private-property",
      title: "ПРИВАТИЗАЦІЯ ОБ'ЄКТІВ",
      subTitle: "Оподаткування у вибір майно",
      description: "Юридичний супровід приватизації нерухомості",
      icon: "⚖️",
      price: "3000 грн"
    },
    {
      id: "commercial-property",
      title: "КОМЕРЦІЙНА НЕРУХОМІСТЬ",
      subTitle: "Офіси, склади, ТРЦ",
      description: "Продаж та оренда комерційних приміщень",
      icon: "🏢",
      price: "5000 грн"
    },
    {
      id: "investment-solutions",
      title: "ІНВЕСТИЦІЙНІ РІШЕННЯ",
      subTitle: "Вигідні інвестиції у Запоріжжі",
      description: "Консультації щодо інвестицій в нерухомість",
      icon: "📈",
      price: "7000 грн"
    }
  ];

  // Використовуємо дані з API або локальні
  const servicesToShow: ServiceCardType[] = apiServices.length > 0 
    ? apiServices.map(apiService => ({
        id: String(apiService.id), // КОНВЕРТУЄМО ID В РЯДОК!
        title: apiService.title.toUpperCase(),
        subTitle: getSubtitleByTitle(apiService.title),
        description: apiService.description,
        icon: getIconByTitle(apiService.title),
        price: `${apiService.price} грн`
      }))
    : localCards;

  console.log('Services to show:', servicesToShow); // ДЕБАГ

  // Допоміжні функції
  function getSubtitleByTitle(title: string): string {
    if (title.includes('Комерційна')) return "Офіси, склади, ТРЦ";
    if (title.includes('Приватизація')) return "Оподаткування у вибір майно";
    if (title.includes('Інвестиційні')) return "Вигідні інвестиції у Запоріжжі";
    return "Професійна послуга";
  }

  function getIconByTitle(title: string): string {
    if (title.includes('Комерційна')) return "🏢";
    if (title.includes('Приватизація')) return "⚖️";
    if (title.includes('Інвестиційні')) return "📈";
    return "💼";
  }

  if (loading) {
    return (
      <section className="services" id="services">
        <div className="services-loading">
          <div className="spinner"></div>
          <p>Завантаження послуг...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="services" id="services">
      <div className="services-header">
        <h2 className="section-title">НАШІ ПОСЛУГИ</h2>
        {error && <div className="api-warning">{error}</div>}
        
        {activeCard && (
          <div className="clear-selection-container">
            <button 
              className="clear-selection-btn"
              onClick={clearSelection}
              title="Скинути вибір"
            >
              ✕ Очистити вибір
            </button>
            <span className="selected-info">
              Обрано: {servicesToShow.find(s => s.id === activeCard)?.title || ""}
            </span>
          </div>
        )}
      </div>
      
      <div className="services-grid">
        {servicesToShow.map((service) => (
          <div key={service.id} className="service-card-container">
            <div 
              className={`service-card-wrapper ${activeCard === service.id ? 'active' : ''}`}
              onClick={() => handleSelectCard(service.id)}
            >
              <div className="service-icon">{service.icon || "💼"}</div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-subtitle">{service.subTitle}</p>
                <p className="service-description">{service.description}</p>
                
                {activeCard === service.id && (
                  <div className="selected-indicator">
                    <span className="selected-badge">✓ ОБРАНО</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="service-actions">
              <div className="price-section">
                <span className="price-label">Вартість:</span>
                <span className="price-value">{service.price || "Ціна не вказана"}</span>
              </div>
              
              <button 
                className="order-button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(service);
                }}
              >
                <span className="cart-icon">🛒</span>
                Додати до кошика
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}