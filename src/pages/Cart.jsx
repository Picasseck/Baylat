import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatPrice } from '../utils/cartUtils';
import './Cart.css';

const FREE_SHIPPING = 1000;

function Cart() {
  const { items, total, clearCart, count } = useCart();

  // Panier vide
  if (items.length === 0) {
    return (
      <main className="cart cart--empty page container">
        <p className="eyebrow">Your bag</p>
        <h1 className="cart__title">Your cart is empty.</h1>
        <p className="cart__empty-text">
          Discover the collection and start your legacy.
        </p>
        <Link to="/products" className="btn btn--large">Browse the collection</Link>
      </main>
    );
  }

  const shipping = total >= FREE_SHIPPING ? 0 : 30;
  const grandTotal = total + shipping;
  const toFreeShipping = Math.max(0, FREE_SHIPPING - total);

  return (
    <main className="cart page container">
      <header className="cart__head">
        <p className="eyebrow">Your bag</p>
        <h1 className="cart__title">Cart</h1>
        <p className="cart__count" data-testid="cart-total">
          {count} item{count === 1 ? '' : 's'} —
          <span> {formatPrice(total)}</span>
        </p>
      </header>

      <div className="cart__layout">
        {/* Liste des articles */}
        <section className="cart__items">
          <ul className="cart__list">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>

          <div className="cart__actions">
            <button className="cart__clear" onClick={clearCart}>Clear cart</button>
            <Link to="/products" className="underline-link">Continue shopping</Link>
          </div>
        </section>

        {/* Résumé */}
        <aside className="cart__summary">
          <h2 className="cart__summary-title">Summary</h2>

          <dl className="cart__row">
            <dt>Subtotal</dt>
            <dd data-testid="subtotal">{formatPrice(total)}</dd>
          </dl>

          <dl className="cart__row">
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</dd>
          </dl>

          {toFreeShipping > 0 && (
            <p className="cart__shipping-info">
              Add {formatPrice(toFreeShipping)} more for free shipping.
            </p>
          )}

          <hr className="cart__divider" />

          <dl className="cart__row cart__row--total">
            <dt>Total</dt>
            <dd data-testid="grand-total">{formatPrice(grandTotal)}</dd>
          </dl>

          <Link to="/checkout" className="btn btn--large btn--full">
            Proceed to checkout
          </Link>

          <p className="cart__summary-note">
            Secure payment · Ships within 72h from Italy
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Cart;