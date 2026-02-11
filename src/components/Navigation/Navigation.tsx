import { Link } from 'react-router-dom';
import './Navigation.css';

interface NavigationProps {
  cartItemsCount: number;
  onClearCart?: () => void; // Додаємо опціональний пропс
}

const Navigation = ({ cartItemsCount, onClearCart }: NavigationProps) => {
  const handleClearCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClearCart) {
      onClearCart();
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="logo">
          СТИМУЛ-СІТІ
        </Link>
        
        <div className="nav-links">
          <Link to="/">ГОЛОВНА</Link>
          <Link to="/about">ПРО КОМПАНІЮ</Link>
          <Link to="/services">ПОСЛУГИ</Link>
          <Link to="/projects">ПРОЕКТИ</Link>
          <Link to="/contact">КОНТАКТИ</Link>
          
          <div className="cart-section">
            <Link to="/cart" className="cart-link">
              🛒 Кошик
              {cartItemsCount > 0 && (
                <span className="cart-count">{cartItemsCount}</span>
              )}
            </Link>
            
            {cartItemsCount > 0 && onClearCart && (
              <button 
                className="clear-cart-nav-btn"
                onClick={handleClearCartClick}
                title="Очистити кошик"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;