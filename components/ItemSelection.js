export default function ItemSelection({ products, onAddToCart, cart }) {
    return (
        <div className="item-selection">
            <h2 style={{ marginBottom: '5px' }}>Welcome! What would you like to order today?</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '25px' }}>Please tap a product to add it to your tray.</p>
            <div className="product-grid">
                {products.map((product) => {
                    // Check if this product is in the cart to show the badge
                    const cartItem = cart?.find(item => item.id === product.id);

                    return (
                        <div key={product.id} className="product-card" onClick={() => onAddToCart(product)}>
                            {/* The Orange Quantity Badge */}
                            {cartItem && (
                                <div className="qty-badge">{cartItem.quantity}</div>
                            )}

                            <div className="product-image-bg">
                                <img src={product.image} alt={product.name} onError={(e) => e.target.style.display = 'none'} />
                            </div>
                            <h3>{product.name}</h3>
                            <p>₱{product.price.toFixed(2)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
