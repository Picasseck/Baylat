import './CategoryFilter.css';

function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-filter__pill${active === cat ? ' category-filter__pill--active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;