import { createContext, useContext, useEffect, useState } from 'react';
import { getCartCount, getCartTotal } from '../utils/cartUtils';

const STORAGE_KEY = 'baylat.cart';
const CartContext = createContext(null);

// Lecture du panier depuis le localStorage
function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readFromStorage);

  // Sauvegarde automatique à chaque changement
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Ajouter un produit (ou augmenter la quantité s'il existe déjà)
  function addToCart(product, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] ?? '',
          category: product.category,
          quantity,
        },
      ];
    });
  }

  // Supprimer un produit du panier
  function removeFromCart(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  // +1 sur la quantité
  function increaseQuantity(id) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  // -1 sur la quantité (supprime si ça tombe à 0)
  function decreaseQuantity(id) {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // Vider tout le panier
  function clearCart() {
    setItems([]);
  }

  const value = {
    items,
    count: getCartCount(items),
    total: getCartTotal(items),
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

// Hook pour accéder au panier depuis n'importe quel composant
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans un CartProvider');
  return ctx;
}