import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <h3 className="footer__name">Baylat</h3>
          <p className="footer__tagline">Buy the Leather, Wear the Legacy.</p>
        </div>

        <div className="footer__columns">
          <div className="footer__col">
            <h4>House</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><a href="#craft">Craftsmanship</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/products">All products</Link></li>
              <li><Link to="/products">Jackets</Link></li>
              <li><Link to="/products">Bags</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Service</h4>
            <ul>
              <li><a href="#shipping">Shipping</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 Baylat — All rights reserved.</span>
        <span>Crafted in Italy.</span>
      </div>
    </footer>
  );
}

export default Footer;