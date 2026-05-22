import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="product-list__empty">
        <p className="product-list__empty-title">No products match your search.</p>
        <p className="product-list__empty-sub">Try removing a filter, or clearing the search bar.</p>
      </div>
    );
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;