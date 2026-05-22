import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found">
      <div className="container not-found__inner">
        <p className="eyebrow">Error 404</p>

        <h1 className="not-found__title">
          This page<br />
          <em>got lost.</em>
        </h1>

        <p className="not-found__text">
          The piece you were looking for has wandered off — or perhaps
          never existed. Let's get you back to the collection.
        </p>

        <div className="not-found__actions">
          <Link to="/" className="btn btn--large">Back to home</Link>
          <Link to="/products" className="underline-link">Browse the collection →</Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;