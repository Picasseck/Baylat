import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search-input" className="visually-hidden">
        Search products
      </label>

      {/* Icône loupe */}
      <svg className="search-bar__icon" viewBox="0 0 24 24" width="18" height="18">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>

      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the collection…"
        className="search-bar__input"
      />

      {/* Bouton clear visible seulement quand il y a du texte */}
      {value && (
        <button className="search-bar__clear" onClick={() => onChange('')}>
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;