import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/cartUtils';
import './Checkout.css';

function Checkout() {
  const { items, total, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  });

  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  // Met à jour un champ et efface son erreur
  function handleChange(field) {
    return (e) => {
      setForm({ ...form, [field]: e.target.value });
      if (errors[field]) {
        const next = { ...errors };
        delete next[field];
        setErrors(next);
      }
    };
  }

  // Vérifie que tous les champs sont remplis
  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      next.email = 'Please enter a valid email.';
    }
    if (!form.address.trim()) next.address = 'Please enter your address.';
    if (!form.city.trim()) next.city = 'Please enter your city.';
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setConfirmed(true);
    clearCart();
  }

  // Panier vide et pas de confirmation
  if (items.length === 0 && !confirmed) {
    return (
      <main className="checkout page container">
        <p className="eyebrow">Checkout</p>
        <h1 className="checkout__title">There's nothing to check out.</h1>
        <p className="checkout__empty">Add a piece to your cart before placing an order.</p>
        <Link to="/products" className="btn btn--large">Browse the collection</Link>
      </main>
    );
  }

  // Confirmation après commande
  if (confirmed) {
    return (
      <main className="checkout checkout--confirmed page container">
        <p className="eyebrow">Order placed</p>
        <h1 className="checkout__title">Thank you, {form.name}.</h1>
        <p className="checkout__confirmed-text">
          Your order has been received. A confirmation has been sent
          to <strong>{form.email}</strong>. Each piece is wrapped by
          hand and ships within 72 hours.
        </p>
        <Link to="/" className="underline-link">Return to home</Link>
      </main>
    );
  }

  // Formulaire
  return (
    <main className="checkout page container">
      <header className="checkout__head">
        <p className="eyebrow">Checkout</p>
        <h1 className="checkout__title">Place your order</h1>
      </header>

      <div className="checkout__layout">
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <h2 className="checkout__section-title">Shipping details</h2>

          <div className={`field${errors.name ? ' field--error' : ''}`}>
            <label htmlFor="name">Full name</label>
            <input id="name" type="text" value={form.name} onChange={handleChange('name')} />
            {errors.name && <p className="field__error" role="alert">{errors.name}</p>}
          </div>

          <div className={`field${errors.email ? ' field--error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={handleChange('email')} />
            {errors.email && <p className="field__error" role="alert">{errors.email}</p>}
          </div>

          <div className={`field${errors.address ? ' field--error' : ''}`}>
            <label htmlFor="address">Address</label>
            <input id="address" type="text" value={form.address} onChange={handleChange('address')} />
            {errors.address && <p className="field__error" role="alert">{errors.address}</p>}
          </div>

          <div className={`field${errors.city ? ' field--error' : ''}`}>
            <label htmlFor="city">City</label>
            <input id="city" type="text" value={form.city} onChange={handleChange('city')} />
            {errors.city && <p className="field__error" role="alert">{errors.city}</p>}
          </div>

          <button type="submit" className="btn btn--large btn--full">
            Confirm order
          </button>
        </form>

        {/* Résumé de commande */}
        <aside className="checkout__summary">
          <h2 className="checkout__section-title">Order summary</h2>
          <ul className="checkout__items">
            {items.map((item) => (
              <li key={item.id} className="checkout__item">
                <span>
                  {item.name}
                  <span className="checkout__item-qty"> × {item.quantity}</span>
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="checkout__totals">
            <span>Total</span>
            <span className="checkout__total-amount">{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;