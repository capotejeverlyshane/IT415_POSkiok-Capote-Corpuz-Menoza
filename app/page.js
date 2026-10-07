'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import ItemSelection from '../components/ItemSelection';
import OrderSummary from '../components/OrderSummary';
import PaymentScreen from '../components/PaymentScreen';
import Receipt from '../components/Receipt';
import ReviewScreen from '../components/ReviewScreen';
const products = [
  { id: 1, name: 'Coffee', price: 45.00, image: '/coffee.jpg' },
  { id: 2, name: 'Sandwich', price: 50.00, image: '/sandwich.jpg' },
  { id: 3, name: 'Soft Drink', price: 35.00, image: '/coke.jpg' },
  { id: 4, name: 'Cookies', price: 25.00, image: '/cookies.jpg' },
  { id: 5, name: 'Bottled Water', price: 20.00, image: '/water.jpg' },
  { id: 6, name: 'Chocolate', price: 25.00, image: '/chocolet.jpg' }
];
export default function Home() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('selection'); // 'selection', 'review', 'payment', 'receipt'
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
    // Stage 5 Bug Fix: Generate transaction number once at checkout time!
    const d = new Date();
    const dateStr = `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`;
    const txnNumber = `TXN-${dateStr}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    setPaymentDetails({
      ...details,
      transactionNumber: txnNumber,
      date: d.toLocaleString()
    });
    setView('receipt');
  };
  const handleNewTransaction = () => {
    setCart([]); // Resets the cart
    setPaymentDetails(null);
    setView('selection');
  };
  return (
    <div className="kiosk-container">
      <Header currentView={view} />

      <main className="main-content">
        {view === 'selection' && (
          <>
            <ItemSelection products={products} onAddToCart={addToCart} cart={cart} />
            <OrderSummary
              cart={cart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
              onProceed={() => setView('review')}
            />
          </>
        )}
        {view === 'review' && (
          <ReviewScreen
            cart={cart}
            total={total}
            onBack={() => setView('selection')}
            onProceed={() => setView('payment')}
          />
        )}
        {view === 'payment' && (
          <PaymentScreen
            total={total}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={() => setView('review')}
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
