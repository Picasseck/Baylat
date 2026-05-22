import './SortSelect.css';

function SortSelect({ value, onChange }) {
  return (
    <div className="sort-select">
      <label htmlFor="sort" className="sort-select__label">Sort</label>
      <select
        id="sort"
        className="sort-select__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="default">Editor's pick</option>
        <option value="price-asc">Price · low to high</option>
        <option value="price-desc">Price · high to low</option>
        <option value="name-asc">Name · A → Z</option>
      </select>
    </div>
  );
}

export default SortSelect;