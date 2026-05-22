import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CartProvider, useCart } from '../context/CartContext';

// Produit fictif pour les tests (avec images en tableau)
const fakeProduct = {
  id: 'test-001',
  name: 'Test Jacket',
  price: 1200,
  category: 'Jackets',
  images: [
    '/images/test-1.jpg',
    '/images/test-2.jpg',
    '/images/test-3.jpg',
    '/images/test-model.jpg',
  ],
  shortDescription: 'A test jacket for unit tests.',
  description: 'Long description here.',
  stock: 5,
  featured: true,
};

// Enveloppe le composant avec les providers nécessaires
function renderCard(ui) {
  return render(
    <MemoryRouter>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>,
  );
}

describe('ProductCard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('affiche le nom et le prix du produit', () => {
    renderCard(<ProductCard product={fakeProduct} />);

    expect(screen.getByText('Test Jacket')).toBeInTheDocument();
    expect(screen.getByText('$1,200')).toBeInTheDocument();
  });

  it('affiche la catégorie et la description courte', () => {
    renderCard(<ProductCard product={fakeProduct} />);

    expect(screen.getByText('Jackets')).toBeInTheDocument();
    expect(screen.getByText('A test jacket for unit tests.')).toBeInTheDocument();
  });

  it('contient un lien vers la fiche produit', () => {
    renderCard(<ProductCard product={fakeProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/test-001');
  });

  it('ajoute le produit au panier au clic sur Add to cart', async () => {
    const user = userEvent.setup();

    // Petit composant qui affiche le compteur du panier
    function CartProbe() {
      const { count } = useCart();
      return <p data-testid="probe">{count}</p>;
    }

    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard product={fakeProduct} />
          <CartProbe />
        </CartProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('probe').textContent).toBe('0');
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(screen.getByTestId('probe').textContent).toBe('1');
  });
});