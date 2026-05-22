import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/cartUtils';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Sécurité : si images n'existe pas, pas de crash
  const mainImage = product.images?.[0] ?? '';
  const modelImage = product.images?.[3] ?? null;

  // Empêche le clic de naviguer vers la fiche produit
  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <article className="product-card" data-testid="product-card">
      <Link to={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__visual">
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className="product-card__image product-card__image--main"
          />

          {/* Image mannequin visible au hover */}
          {modelImage && (
            <img
              src={modelImage}
              alt={`${product.name} on model`}
              loading="lazy"
              className="product-card__image product-card__image--model"
            />
          )}

          <div className="product-card__overlay">
            <button className="btn product-card__add" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>

        <div className="product-card__info">
          <p className="product-card__category">{product.category}</p>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__description">{product.shortDescription}</p>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;