# Baylat

> Buy the Leather, Wear the Legacy.

Projet e-commerce frontend pour ma marque de cuir fictive **Baylat**. Le concept : une maison de cuir premium italienne qui vend uniquement des vestes et des sacs en cuir.

J'ai construit ce projet avec React et Vite, sans framework CSS ni backend. Le panier est géré avec Context API et sauvegardé dans le localStorage, les produits viennent d'un fichier JSON local. Tout le CSS est écrit à la main.

Ce projet m'a permis de travailler sur un vrai workflow Git avec des branches, des pull requests et des commits progressifs.

---

## Stack

- React 18
- Vite
- React Router 6
- Context API + localStorage
- CSS classique
- Vitest + React Testing Library

---

## Pages du site

- **Home** — hero avec portrait du fondateur, sélection de produits, catégories et manifeste de marque
- **Products** — catalogue complet avec barre de recherche, filtre par catégorie et tri par prix/nom
- **Product Details** — fiche produit avec galerie de 4 images cliquables et ajout au panier
- **Cart** — panier avec gestion des quantités, résumé de commande et seuil de livraison gratuite
- **Checkout** — formulaire de commande avec validation des champs et message de confirmation
- **About** — page personnelle sur le fondateur et les valeurs de la marque
- **404** — page d'erreur pour les URLs inconnues

---

## Lancer le projet

```bash
git clone https://github.com/Picasseck/Baylat.git
cd Baylat
npm install
npm run dev
```

Le site tourne sur `http://localhost:5173`.

---

## Lancer les tests

```bash
npm run test:run
```

18 tests au total sur les composants principaux : ProductCard, Navbar, Cart, recherche produits et validation du checkout.

---

## Structure