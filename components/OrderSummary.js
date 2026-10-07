import { formatCurrency } from '../lib/utils';
export default function OrderSummary({ cart, onIncrease, onDecrease, onRemove, onProceed }) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="order-section">
            <h2>CURRENT ORDER</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div>
                                <h4>{item.name}</h4>
                                <p>₱{item.price.toFixed(2)}</p>
                            </div>
                            <div className="quantity-controls">
                                <button onClick={() => onDecrease(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => onIncrease(item.id)}>+</button>
                            </div>
                            <div>
                                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                                <button className="cancel-btn" style={{ padding: '5px', marginLeft: '10px' }} onClick={() => onRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="cart-total" style={{ marginTop: '20px' }}>
                <h3>TOTAL: {formatCurrency(total)}</h3>
                <button
                    className="proceed-btn"
                    disabled={cart.length === 0}
                    onClick={onProceed}
                    style={{ padding: '15px', marginTop: '10px', fontSize: '1.2rem', backgroundColor: '#4caf50', color: 'white', width: '100%' }}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}
