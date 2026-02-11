import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import type { ServiceCardType } from './types/ServiceCard.type';
import './App.css';

function App() {
  // Завантажуємо кошик з localStorage при завантаженні
  const [cartItems, setCartItems] = useState<Array<ServiceCardType & { quantity: number }>>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Зберігаємо кошик в localStorage при зміні
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (service: ServiceCardType) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === service.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...service, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Кошик порожній!');
      return;
    }
    
    const total = cartItems.reduce((sum, item) => {
      const priceMatch = item.price.match(/(\d+(\.\d+)?)/);
      return priceMatch ? sum + (parseFloat(priceMatch[0]) * item.quantity) : sum;
    }, 0);
    
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    const confirmMessage = `Оформити замовлення на суму ${total.toFixed(2)} грн?\n\nКількість послуг: ${totalItems}`;
    
    if (window.confirm(confirmMessage)) {
      // Зберігаємо історію замовлень
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      orderHistory.push({
        items: cartItems,
        total,
        date: new Date().toISOString()
      });
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      
      alert(`✅ Замовлення оформлено на суму ${total.toFixed(2)} грн!\nДякуємо за покупку!`);
      
      // Очищаємо кошик
      setCartItems([]);
    }
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      alert('Кошик вже порожній!');
      return;
    }
    
    if (window.confirm('Ви впевнені, що хочете повністю очистити кошик?')) {
      setCartItems([]);
      alert('Кошик очищено!');
    }
  };

  return (
    <Router>
      <div className="App">
        <Navigation 
          cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
          onClearCart={handleClearCart}
        />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services onAddToCart={handleAddToCart} />
              <Projects />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services onAddToCart={handleAddToCart} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={
            <Cart
              cartItems={cartItems}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={handleCheckout}
            />
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;