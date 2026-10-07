import ProductCard from './ProductCard';

export default function ItemSelection({ products, onAdd }) {
    return (
        <div className="item-selection">
            <h2>PRODUCTS</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAdd={onAdd} />
                ))}
            </div>
        </div>
    );
}
