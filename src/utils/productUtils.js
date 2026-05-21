// Filtre les produits par catégorie ("All" = pas de filtre)
export function filterByCategory(products, category) {
  if (!category || category === 'All') return products;
  return products.filter((p) => p.category === category);
}

// Recherche dans le nom, la description et la catégorie
export function searchProducts(products, query) {
  const term = (query || '').trim().toLowerCase();
  if (term === '') return products;

  return products.filter((p) => {
    const text = `${p.name} ${p.description} ${p.category}`.toLowerCase();
    return text.includes(term);
  });
}

// Tri par prix ou par nom
export function sortProducts(products, sortKey) {
  const copy = [...products];

  switch (sortKey) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

// Applique filtre + recherche + tri dans l'ordre
export function applyProductPipeline(products, { category, search, sort }) {
  let result = filterByCategory(products, category);
  result = searchProducts(result, search);
  result = sortProducts(result, sort);
  return result;
}