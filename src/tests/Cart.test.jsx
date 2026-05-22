import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../pages/Cart';
import Products from '../pages/Products';
import { CartProvider } from '../context/CartContext';

function renderWithProviders(ui, initialCart = []) {
  localStorage.setItem('baylat.cart', JSON.stringify(initialCart));

  return render(
    <MemoryRouter>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>,
  );
}

describe('Page panier', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('affiche l\'état vide quand le panier est vide', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('affiche le bon sous-total et total', () => {
    renderWithProviders(<Cart />, [
      { id: 'a', name: 'A', price: 500, image: '', category: 'Bags', quantity: 2 },
      { id: 'b', name: 'B', price: 200, image: '', category: 'Jackets', quantity: 1 },
    ]);

    // 500*2 + 200 = 1200, au dessus du seuil livraison gratuite
    expect(screen.getByTestId('subtotal').textContent).toBe('$1,200');
    expect(screen.getByTestId('grand-total').textContent).toBe('$1,200');
  });

  it('ajoute des frais de livraison sous le seuil', () => {
    renderWithProviders(<Cart />, [
      { id: 'a', name: 'A', price: 100, image: '', category: 'Bags', quantity: 2 },
    ]);

    // 200 + 30 livraison = 230
    expect(screen.getByTestId('subtotal').textContent).toBe('$200');
    expect(screen.getByTestId('grand-total').textContent).toBe('$230');
  });

  it('vide le panier au clic sur Clear cart', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Cart />, [
      { id: 'a', name: 'A', price: 100, image: '', category: 'Bags', quantity: 1 },
    ]);

    await user.click(screen.getByRole('button', { name: /clear cart/i }));
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});

describe('Recherche produits', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('filtre les produits par le terme recherché', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Products />);

    const cards = screen.getAllByTestId('product-card');
    expect(cards.length).toBeGreaterThan(1);

    const search = screen.getByPlaceholderText(/search the collection/i);
    await user.type(search, 'vanta');

    const filtered = screen.getAllByTestId('product-card');
    expect(filtered.length).toBe(1);
    expect(screen.getByText(/vanta 777/i)).toBeInTheDocument();
  });

  it('affiche un message quand rien ne correspond', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Products />);

    await user.type(
      screen.getByPlaceholderText(/search the collection/i),
      'xyz-aucun-resultat',
    );

    expect(screen.getByText(/no products match your search/i)).toBeInTheDocument();
  });
});