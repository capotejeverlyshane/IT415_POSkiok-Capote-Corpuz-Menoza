import React from 'react';
import { formatCurrency } from '../lib/utils';

export default function ReviewScreen({ cart, total, onBack, onProceed }) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="review-screen">
            <div className="review-header">
                <h2>Review your order</h2>
                <p>Check your items before paying. Tap Back to make changes — your items stay in the cart.</p>
            </div>

            <div className="review-ticket">
                <div className="review-ticket-items">
                    {cart.map((item, index) => (
                        <div key={index} className="review-ticket-row">
                            <div className="review-row-left">
                                <div className="review-qty-badge">{item.quantity}x</div>
                                <span className="review-product-name">{item.name}</span>
                            </div>
                            <div className="review-row-right">
                                <span className="review-unit-price">{formatCurrency(item.price)} each</span>
                                <span className="review-subtotal">{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="review-ticket-total">
                    <div className="review-total-left">
                        <strong>Total Amount</strong>
                        <span>{totalItems} items</span>
                    </div>
                    <div className="review-total-right">
                        {formatCurrency(total)}
                    </div>
                </div>
            </div>

            <div className="review-actions">
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
                <button className="continue-btn" onClick={onProceed}>
                    Continue to Payment →
                </button>
            </div>
        </div>
    );
}
