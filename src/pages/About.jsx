import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <main className="about page">

      {/* En-tête */}
      <header className="about__hero">
        <div className="container">
          <p className="eyebrow">The Story</p>
          <h1 className="about__title">
            Baylat,<br />
            <em>a personal house.</em>
          </h1>
          <p className="about__tagline">Buy the Leather, Wear the Legacy.</p>
        </div>
      </header>

      {/* Portrait + texte personnel */}
      <section className="container about__intro">
        <div className="about__portrait">
          <img src="/images/baylat-profile.png" alt="Portrait of Baylat, founder" />
          <p className="about__portrait-caption">
            <span>Baylat</span>
            <span>Founder · 2026</span>
          </p>
        </div>

        <div className="about__copy">
          <p className="about__lead">
            My name is Baylat. I was born in Chiari, Italy. I am 20 years old
            and passionate about art, fashion, and web development.
          </p>

          <p>
           With Baylat, I want to create a universe around leather, elegance,
           and legacy. My ambition is to build a premium brand that blends
           design, identity, character, and modernity — a house that does not
           simply follow trends, but creates its own direction.
          </p>

          <p>
            Baylat represents my desire to create something personal, strong,
            and timeless. Through this brand, I bring together my passion for
            fashion, my eye for art, and my skills in web development. Each
            piece is imagined as an object to keep, wear, and pass on.
          </p>

          <p className="about__highlight">
            "Buy the Leather, Wear the Legacy" — each piece is not just a
            product. It is a story, an identity, and a legacy to wear.
          </p>
        </div>
      </section>

      {/* Les 3 piliers */}
      <section className="about__pillars">
        <div className="container about__pillars-grid">
          <article className="about__pillar">
            <p className="about__pillar-number">01</p>
            <h3 className="about__pillar-title">The Material</h3>
            <p>
              Imagined around full-grain leather, clean cuts, and timeless finishes.
              We use the part of the hide that remembers — the part
              that scratches, marks and develops a patina over time.
            </p>
          </article>

          <article className="about__pillar">
            <p className="about__pillar-number">02</p>
            <h3 className="about__pillar-title">The Approach</h3>
            <p>
              Two product lines — jackets and bags — refined in depth
              rather than expanded in breadth. Small editions, no
              reissues. What we make this season is what we make.
            </p>
          </article>

          <article className="about__pillar">
            <p className="about__pillar-number">03</p>
            <h3 className="about__pillar-title">The Legacy</h3>
            <p>
              A Baylat piece is built to be passed down. It outlives
              the season, the trend, sometimes the owner. That's the
              whole point — to make something worth inheriting.
            </p>
          </article>
        </div>
      </section>

      {/* Lien vers la collection */}
      <section className="about__cta">
        <div className="container about__cta-inner">
          <h2 className="about__cta-title">Step into the collection.</h2>
          <Link to="/products" className="btn btn--large">Discover the pieces</Link>
        </div>
      </section>
    </main>
  );
}

export default About;