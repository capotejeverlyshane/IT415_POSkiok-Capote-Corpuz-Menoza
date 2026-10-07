import { formatCurrency } from '../lib/utils';

export default function OrderSummary({ cart, onIncrease, onDecrease, onRemove, onProceed }) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="order-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#0f172a', fontSize: '1.8rem', margin: 0 }}>Your Order</h2>
                <span style={{ color: '#64748b', fontWeight: 'bold' }}>{totalItems} items</span>
            </div>

            {cart.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '50px', color: '#94a3b8' }}>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <h4>{item.name}</h4>
                            <div className="unit-price">{formatCurrency(item.price)} each</div>

                            {/* Trash Can Top Right */}
                            <button className="cancel-btn" onClick={() => onRemove(item.id)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>

                            <div className="cart-item-bottom">
                                {/* Quantity Left */}
                                <div className="quantity-controls">
                                    <button onClick={() => onDecrease(item.id)}>-</button>
                                    <span style={{ fontSize: '1.2rem', fontWeight: '900', width: '25px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button onClick={() => onIncrease(item.id)}>+</button>
                                </div>
                                {/* Total Price Right */}
                                <div className="cart-item-total">
                                    {formatCurrency(item.price * item.quantity)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="cart-total">
                <h3><span>Total</span> <span>{formatCurrency(total)}</span></h3>
                <button
                    className="proceed-btn"
                    disabled={cart.length === 0}
                    onClick={onProceed}
                >
                    Review Order →
                </button>
            </div>
        </div>
    );
}
