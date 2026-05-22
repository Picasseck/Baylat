import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/cartUtils';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState(false);

  // Produit introuvable
  if (!product) {
    return (
      <main className="product-not-found container">
        <h1>Product not found</h1>
        <p>We couldn't find the piece you were looking for.</p>
        <Link to="/products" className="underline-link">Back to products</Link>
      </main>
    );
  }

  const thumbLabels = ['Front', 'Back', 'Detail', 'On model'];

  function handleAddToCart() {
    addToCart(product, quantity);
    setConfirmation(true);
    setTimeout(() => setConfirmation(false), 2400);
  }

  return (
    <main className="product-details page container">

      {/* Fil d'Ariane */}
      <nav className="product-details__breadcrumb">
        <Link to="/" className="underline-link">Home</Link>
        <span>/</span>
        <Link to="/products" className="underline-link">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-details__grid">

        {/* Galerie : miniatures + grande image */}
        <div className="product-details__gallery">
          <div className="product-details__thumbs">
            {product.images.map((src, i) => (
              <button
                key={i}
                className={`product-details__thumb${selectedImage === i ? ' product-details__thumb--active' : ''}`}
                onClick={() => setSelectedImage(i)}
              >
                <img src={src} alt={thumbLabels[i]} loading="lazy" />
              </button>
            ))}
          </div>

          <figure className="product-details__main-image">
            <img
              src={product.images[selectedImage]}
              alt={`${product.name} — ${thumbLabels[selectedImage]}`}
              key={selectedImage}
            />
          </figure>
        </div>

        {/* Infos produit */}
        <div className="product-details__info">
          <p className="eyebrow">{product.category}</p>
          <h1 className="product-details__name">{product.name}</h1>
          <p className="product-details__price">{formatPrice(product.price)}</p>
          <p className="product-details__description">{product.description}</p>

          <dl className="product-details__specs">
            <div>
              <dt>Reference</dt>
              <dd>{product.id.toUpperCase()}</dd>
            </div>
            <div>
              <dt>Stock</dt>
              <dd>{product.stock > 0 ? `${product.stock} available` : 'Sold out'}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>Free worldwide on orders over $1,000</dd>
            </div>
          </dl>

          {/* Quantité + ajout panier */}
          <div className="product-details__actions">
            <div className="product-details__quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}>+</button>
            </div>

            <button
              className="btn btn--large"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Sold out' : 'Add to cart'}
            </button>
          </div>

          {confirmation && (
            <p className="product-details__confirmation">Added to your cart.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;