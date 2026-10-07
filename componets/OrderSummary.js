export default function OrderSummary({ cart, onIncrease, onDecrease, onRemove }) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="order-summary">
            <h2>CURRENT ORDER</h2>

            <div className="cart-items">
                {cart.length === 0 ? (
                    <p className="empty-cart">No items selected.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-details">
                                <span className="cart-item-name">{item.name}</span>
                                <span className="cart-item-calc">₱{item.price.toFixed(2)} × {item.quantity} = ₱{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <div className="cart-controls">
                                <button onClick={() => onDecrease(item.id)}>-</button>
                                <span className="quantity">{item.quantity}</span>
                                <button onClick={() => onIncrease(item.id)}>+</button>
                                <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="cart-total">
                <h3>TOTAL: ₱{total.toFixed(2)}</h3>
                <button
                    className="proceed-btn"
                    disabled={cart.length === 0}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}
