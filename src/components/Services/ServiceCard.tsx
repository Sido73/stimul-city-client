import { useState } from 'react';
import type { ServiceCardType } from '../../types/ServiceCard.type';
import './Services.css';

interface ServiceCardProps {
  service: ServiceCardType;
  onAddToCart: (service: ServiceCardType & { quantity: number }) => void;
}

const ServiceCard = ({ service, onAddToCart }: ServiceCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const serviceWithQuantity = { ...service, quantity };
    onAddToCart(serviceWithQuantity);
    setQuantity(1);
    alert(`Додано до кошика: ${service.title} (${quantity} шт.)`);
  };

  // Отримуємо ціну як число
  const priceMatch = service.price.match(/(\d+(\.\d+)?)/);
  const price = priceMatch ? parseFloat(priceMatch[0]) : 0;

  return (
    <div className="service-card">
      <h3>{service.title}</h3>
      <p className="service-subtitle">{service.subTitle}</p> {/* subTitle, не subtitle! */}
      <p className="service-description">{service.description}</p>
      
      <div className="service-price">
        <strong>Вартість:</strong>
        <span>{price.toFixed(2)} грн</span> {/* тепер працює */}
      </div>

      <div className="quantity-selector">
        <label>Кількість:</label>
        <div className="quantity-controls">
          <button 
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="quantity-btn"
          >
            -
          </button>
          <span className="quantity-value">{quantity}</span>
          <button 
            onClick={() => setQuantity(prev => prev + 1)}
            className="quantity-btn"
          >
            +
          </button>
        </div>
      </div>

      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        🛒 Додати до кошика
      </button>
    </div>
  );
};

export default ServiceCard;