export default function ProductCard({ product, onAdd }) {
    return (
        <div className="product-card" onClick={() => onAdd(product)}>
            <div className="product-image-placeholder">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerText = 'No Image';
                    }}
                />
            </div>
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">₱{product.price.toFixed(2)}</p>
        </div>
    );
}
