'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import ItemSelection from '../components/ItemSelection';
import OrderSummary from '../components/OrderSummary';
import PaymentScreen from '../components/PaymentScreen';
import Receipt from '../components/Receipt';
const products = [
  { id: 1, name: 'Coffee', price: 45.00, image: '/images/coffee.jpg' },
  { id: 2, name: 'Sandwich', price: 50.00, image: '/images/sandwich.jpg' },
  { id: 3, name: 'Soft Drink', price: 35.00, image: '/images/soft-drink.jpg' },
  { id: 4, name: 'Cookies', price: 25.00, image: '/images/cookies.jpg' },
  { id: 5, name: 'Bottled Water', price: 20.00, image: '/images/bottled-water.jpg' },
  { id: 6, name: 'Chocolate', price: 25.00, image: '/images/chocolate.jpg' }
];
export default function Home() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('selection'); // 'selection', 'payment', 'receipt'
  const [paymentDetails, setPaymentDetails] = useState(null);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };
  const decreaseQuantity = (id) => {
    setCart(cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  const handlePaymentSuccess = (details) => {
    setPaymentDetails(details);
    setView('receipt');
  };
  const handleNewTransaction = () => {
    setCart([]); // Resets the cart
    setPaymentDetails(null);
    setView('selection');
  };
  return (
    <div className="kiosk-container">
      <Header />
      <main className="main-content">
        {view === 'selection' && (
          <>
            <ItemSelection products={products} onAdd={addToCart} />
            <OrderSummary
              cart={cart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
              onProceed={() => setView('payment')}
            />
          </>
        )}
        {view === 'payment' && (
          <PaymentScreen
            total={total}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={() => setView('selection')}
          />
        )}
        {view === 'receipt' && (
          <Receipt
            cart={cart}
            total={total}
            paymentDetails={paymentDetails}
            onNewTransaction={handleNewTransaction}
          />
        )}
      </main>
    </div>
  );
}
