# NIM'S KITCHEN

Ordering website for Nim's Kitchen — authentic Ofada rice in Bouesti, Ikere Ekiti.
Built with React + TypeScript + Vite + Tailwind, hosted on Netlify.

## How ordering works

1. Customers add meals (with add-ons) to the cart. The cart is saved in their browser.
2. At checkout they enter name, phone, delivery area/address (or pickup), payment choice and an optional time.
3. **Place Order on WhatsApp** opens WhatsApp with the full order already typed in — items, add-ons,
   quantities, prices, delivery fee, total, address, payment and notes. They tap Send.
4. If WhatsApp doesn't open automatically, the confirmation page has a button that sends the same message.

Orders are not stored on the website — WhatsApp is the order inbox.

## Changing business details

Edit **`src/config/business.ts`**: WhatsApp/phone number, email, opening hours, delivery fee,
minimum order, delivery areas, prep time and social links (empty links are hidden).

Menu items and testimonials live in **`src/data/products.ts`**. Images go in `public/images/`
(WebP, ~800px wide, keeps the site fast on mobile data).

## Contact form

Uses Netlify Forms. Submissions appear in Netlify → your site → **Forms**. Turn on email
notifications there (Forms → Form notifications) to get them in your inbox.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run lint
```
