import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Ferme le menu mobile quand on clique un lien
  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          Baylat
        </Link>

        {/* Bouton burger pour mobile */}
        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation principale */}
        <nav className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`}>
          <NavLink to="/" end className="navbar__link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/products" className="navbar__link" onClick={closeMenu}>
            Products
          </NavLink>
          <NavLink to="/about" className="navbar__link" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/cart" className="navbar__link" onClick={closeMenu}>
            Cart
            <span className="navbar__count" data-testid="cart-count">
              {count}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;