import type { ServiceCardType } from '../../types/ServiceCard.type';
import './Cart.css';

interface CartProps {
  cartItems: Array<ServiceCardType & { quantity: number }>;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

const Cart = ({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}: CartProps) => {
  const total = cartItems.reduce((sum, item) => {
    const priceMatch = item.price.match(/(\d+(\.\d+)?)/);
    const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
    return sum + (price * item.quantity);
  }, 0);

  // Якщо кошик порожній
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">🛒</div>
        <h2>Кошик порожній</h2>
        <p>Додайте послуги зі сторінки "Наші послуги"</p>
        
        <div className="cart-empty-buttons">
          <button 
            className="back-to-services-btn"
            onClick={() => window.location.href = '/services'}
          >
            ← Повернутися до послуг
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>🛒 Ваш кошик ({cartItems.length} товарів)</h2>
      
      <div className="cart-items">
        {cartItems.map((item) => {
          const priceMatch = item.price.match(/(\d+(\.\d+)?)/);
          const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
          
          return (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h3>{item.title}</h3>
                <p className="item-subtitle">{item.subTitle}</p>
                <p className="item-description">{item.description}</p>
              </div>
              
              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="item-price">
                  {(price * item.quantity).toFixed(2)} грн
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Видалити
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="cart-summary">
        <h3>Підсумок замовлення</h3>
        <div className="summary-row">
          <span>Кількість послуг:</span>
          <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
        <div className="summary-row">
          <span>Позицій у кошику:</span>
          <span>{cartItems.length}</span>
        </div>
        <div className="summary-row total">
          <span>Загальна сума:</span>
          <span>{total.toFixed(2)} грн</span>
        </div>
        
        <button 
          className="checkout-btn" 
          onClick={() => {
            const confirmCheckout = window.confirm(
              `Ви оформлюєте замовлення на суму ${total.toFixed(2)} грн.\nПідтвердити?`
            );
            if (confirmCheckout) {
              onCheckout();
            }
          }}
        >
          Оформити замовлення
        </button>
      </div>
    </div>
  );
};

export default Cart;