'use client';

import React from 'react';

// Product data for the initial foundation
const products = [
  {
    id: 1,
    name: 'Coffee',
    price: 85.00,
    image: '/images/coffee.jpg'
  },
  {
    id: 2,
    name: 'Sandwich',
    price: 120.00,
    image: '/images/sandwich.jpg'
  },
  {
    id: 3,
    name: 'Soft Drink',
    price: 45.00,
    image: '/images/soft-drink.jpg'
  },
  {
    id: 4,
    name: 'Cookies',
    price: 55.00,
    image: '/images/cookies.jpg'
  },
  {
    id: 5,
    name: 'Bottled Water',
    price: 25.00,
    image: '/images/bottled-water.jpg'
  },
  {
    id: 6,
    name: 'Chocolate',
    price: 75.00,
    image: '/images/chocolate.jpg'
  }
];

export default function Home() {
  return (
    <div className="kiosk-container">
      <header className="header">
        <h1>Campus Food & Merchandise</h1>
      </header>

      <main className="main-content">
        <div className="product-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => console.log(`Selected: ${product.name}`)}
            >
              <div className="product-image-placeholder">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  onError={(e) => {
                    // Fallback if image is not yet available in the public folder
                    e.target.style.display = 'none';
                    e.target.parentElement.innerText = 'No Image';
                  }}
                />
              </div>
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">₱{product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
