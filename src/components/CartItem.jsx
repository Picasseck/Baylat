import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/cartUtils';
import './CartItem.css';

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <li className="cart-item">
      <Link to={`/products/${item.id}`} className="cart-item__visual">
        <img src={item.image} alt={item.name} loading="lazy" />
      </Link>

      <div className="cart-item__body">
        <div>
          <p className="cart-item__category">{item.category}</p>
          <Link to={`/products/${item.id}`} className="cart-item__name">
            {item.name}
          </Link>
          <p className="cart-item__unit-price">{formatPrice(item.price)} each</p>
        </div>

        <div className="cart-item__controls">
          <div className="cart-item__quantity">
            <button onClick={() => decreaseQuantity(item.id)}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>

          <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      </div>

      <p className="cart-item__total">{formatPrice(item.price * item.quantity)}</p>
    </li>
  );
}

export default CartItem;