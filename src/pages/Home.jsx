import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import './Home.css';

function Home() {
  // On prend les 4 premiers produits marqués "featured"
  const featured = productsData.filter((p) => p.featured).slice(0, 4);

  return (
    <main className="home">

      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero__grid container">
          <div className="hero__copy">
            <p className="eyebrow">Volume 01 · Autumn Edition</p>

            <h1 className="hero__title">
              Wear the<br />
              <em>Legacy.</em>
            </h1>

            <p className="hero__tagline">
              Buy the Leather, Wear the Legacy.
            </p>

            <p className="hero__text">
              Baylat is a leather house built around two things: jackets
              and bags. Each piece is cut from full-grain hide, hand-finished,
              and made to last long enough to be passed down.
            </p>

            <div className="hero__actions">
              <Link to="/products" className="btn btn--large">
                Shop the collection
              </Link>
              <Link to="/about" className="underline-link">
                Our story →
              </Link>
            </div>
          </div>

          <div className="hero__portrait">
            <img
              src="/images/baylat-hero.png"
              alt="Baylat, founder portrait"
              className="hero__image"
            />
            <div className="hero__caption">
              <span className="hero__caption-num">N°01</span>
              <span className="hero__caption-text">
                The Founder<br />
                <em>Baylat</em>
              </span>
            </div>
          </div>
        </div>

        {/* Bandeau défilant */}
        <div className="hero__marquee" aria-hidden="true">
          <span>Full-Grain Leather</span>
          <span>·</span>
          <span>Hand Finished</span>
          <span>·</span>
          <span>Made in Italy</span>
          <span>·</span>
          <span>Limited Editions</span>
          <span>·</span>
          <span>Full-Grain Leather</span>
          <span>·</span>
          <span>Hand Finished</span>
          <span>·</span>
        </div>
      </section>

      {/* ---------- COLLECTION ---------- */}
      <section className="home-section container">
        <header className="home-section__head">
          <div>
            <p className="eyebrow">The Leather Collection</p>
            <h2 className="home-section__title">
              Pieces meant to outlive the season.
            </h2>
          </div>
          <Link to="/products" className="underline-link">View all</Link>
        </header>

        <ul className="home-section__grid">
          {featured.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- JACKETS & BAGS ---------- */}
      <section className="home-duo container">
        <Link to="/products" className="home-duo__card home-duo__card--jackets">
          <img src="/images/category-jackets.png" alt="Leather Jackets" className="home-duo__bg" />
          <div className="home-duo__overlay">
            <p className="eyebrow home-duo__eyebrow">Category 01</p>
            <h3 className="home-duo__title">Jackets</h3>
            <span className="underline-link home-duo__cta">Shop jackets</span>
          </div>
        </Link>

        <Link to="/products" className="home-duo__card home-duo__card--bags">
          <img src="/images/category-bags.png" alt="Leather Bags" className="home-duo__bg" />
          <div className="home-duo__overlay">
            <p className="eyebrow home-duo__eyebrow">Category 02</p>
            <h3 className="home-duo__title">Bags</h3>
            <span className="underline-link home-duo__cta">Shop bags</span>
          </div>
        </Link>
      </section>

      {/* ---------- MANIFESTE ---------- */}
      <section className="home-manifesto">
        <div className="container home-manifesto__inner">
          <p className="eyebrow">The Baylat Universe</p>
          <blockquote className="home-manifesto__quote">
            "A jacket is not an outfit.<br />
            It's a chapter you keep wearing."
          </blockquote>
          <p className="home-manifesto__signature">— Baylat</p>
          <Link to="/about" className="btn btn--outline btn--large">
            Read the story
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;