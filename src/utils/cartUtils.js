// Compte le nombre total d'articles dans le panier
export function getCartCount(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

// Calcule le montant total du panier
export function getCartTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Formate un prix en dollars US
export function formatPrice(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '—';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}