import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartProvider } from '../context/CartContext';

function renderNavbar(initialCart = []) {
  localStorage.setItem('baylat.cart', JSON.stringify(initialCart));

  return render(
    <MemoryRouter>
      <CartProvider>
        <Navbar />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('affiche le nom de la marque et les liens principaux', () => {
    renderNavbar();

    expect(screen.getByText('Baylat')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('affiche 0 quand le panier est vide', () => {
    renderNavbar();

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
  });

  it('affiche le nombre total d\'articles dans le panier', () => {
    renderNavbar([
      { id: 'a', name: 'A', price: 100, image: '', category: 'Bags', quantity: 2 },
      { id: 'b', name: 'B', price: 200, image: '', category: 'Jackets', quantity: 3 },
    ]);

    expect(screen.getByTestId('cart-count').textContent).toBe('5');
  });
});