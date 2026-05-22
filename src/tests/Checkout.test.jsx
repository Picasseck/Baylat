import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Checkout from '../pages/Checkout';
import { CartProvider } from '../context/CartContext';

const cartWithItems = [
  { id: 'a', name: 'Test Jacket', price: 500, image: '', category: 'Jackets', quantity: 1 },
];

function renderCheckout(initialCart = cartWithItems) {
  localStorage.setItem('baylat.cart', JSON.stringify(initialCart));

  return render(
    <MemoryRouter>
      <CartProvider>
        <Checkout />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe('Page commande', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('affiche l\'état vide quand le panier est vide', () => {
    renderCheckout([]);
    expect(screen.getByText(/there's nothing to check out/i)).toBeInTheDocument();
  });

  it('affiche une erreur pour chaque champ vide', async () => {
    const user = userEvent.setup();
    renderCheckout();

    await user.click(screen.getByRole('button', { name: /confirm order/i }));

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your address/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your city/i)).toBeInTheDocument();
  });

  it('rejette un email invalide', async () => {
    const user = userEvent.setup();
    renderCheckout();

    await user.type(screen.getByLabelText(/full name/i), 'Baylat');
    await user.type(screen.getByLabelText(/email/i), 'pas-un-email');
    await user.type(screen.getByLabelText(/address/i), '1 Via Roma');
    await user.type(screen.getByLabelText(/city/i), 'Chiari');

    await user.click(screen.getByRole('button', { name: /confirm order/i }));

    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it('affiche la confirmation quand le formulaire est valide', async () => {
    const user = userEvent.setup();
    renderCheckout();

    await user.type(screen.getByLabelText(/full name/i), 'Baylat');
    await user.type(screen.getByLabelText(/email/i), 'hello@baylat.com');
    await user.type(screen.getByLabelText(/address/i), '1 Via Roma');
    await user.type(screen.getByLabelText(/city/i), 'Chiari');

    await user.click(screen.getByRole('button', { name: /confirm order/i }));

    expect(screen.getByText(/thank you, baylat/i)).toBeInTheDocument();
  });

  it('efface l\'erreur quand on corrige le champ', async () => {
    const user = userEvent.setup();
    renderCheckout();

    await user.click(screen.getByRole('button', { name: /confirm order/i }));
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/full name/i), 'B');
    expect(screen.queryByText(/please enter your name/i)).not.toBeInTheDocument();
  });
});