# Perfume Store

A multi-page React fragrance storefront with a black-and-gold design, responsive home carousel, For Her and For Him collections, category and price filters, product detail pages, wishlist, cart, and browser-only demo accounts.

## Run locally

1. Install Node.js 18 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and add a Stripe **test-mode** secret key as `STRIPE_SECRET_KEY`.
4. Run `npm run dev` and open `http://localhost:5173`.

The client and Express checkout API start together. Checkout uses Stripe-hosted test Checkout with the demo catalog's PKR prices. Without a test key, the checkout page displays a setup message and no payment is attempted.

For Stripe's test checkout, use test card `4242 4242 4242 4242`, any future expiry date, and any CVC.

Demo account details are stored in the current browser only; this is not production authentication. Product photographs and hover alternatives are loaded from the supplied `src/pic` collection and bundled with the storefront.
