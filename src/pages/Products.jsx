import { useMemo, useState } from 'react';
import productsData from '../data/products.json';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortSelect from '../components/SortSelect';
import { applyProductPipeline } from '../utils/productUtils';
import './Products.css';

function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  // On tire les catégories du JSON pour ne pas les écrire en dur
  const categories = useMemo(() => {
    const unique = new Set(productsData.map((p) => p.category));
    return ['All', ...Array.from(unique)];
  }, []);

  // Applique recherche + filtre + tri en une seule passe
  const visible = useMemo(
    () => applyProductPipeline(productsData, { category, search, sort }),
    [category, search, sort],
  );

  return (
    <main className="products page container">
      <header className="products__head">
        <p className="eyebrow">The Collection</p>
        <h1 className="products__title">All Products</h1>
        <p className="products__subtitle">
          {visible.length} piece{visible.length === 1 ? '' : 's'} —
          jackets and bags, hand-finished in Italy.
        </p>
      </header>

      <div className="products__controls">
        <div className="products__search">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="products__filter">
          <CategoryFilter categories={categories} active={category} onChange={setCategory} />
        </div>
        <div className="products__sort">
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <ProductList products={visible} />
    </main>
  );
}

export default Products;