# Water Cycle — Complete Water & Pool Solutions Website

Business website for **Water Cycle** (Adma, Lebanon), built with **React + Vite + TypeScript + Tailwind CSS**.

- **Live Website:** [https://water1cycle.vercel.app](https://water1cycle.vercel.app)
- **GitHub Repository:** [https://github.com/alichuck/water-cycle](https://github.com/alichuck/water-cycle)

---

## 1. Quick Start in Visual Studio Code

1. Open this folder in **Visual Studio Code**.
2. Open the integrated terminal (`Ctrl + ~`) and install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal (default: `http://localhost:3000`).

---

## 2. How to Edit Content (`src/data/siteContent.ts`)

All company contact information, hero copy, About Us text, the 3 primary services, the 2 additional solutions, before/after image paths, project portfolio slots, and verified customer reviews live in a single typed file:

- **`src/data/siteContent.ts`**

### Checklist of Items to Confirm or Replace Before Public Launch
1. **Before & After Pool Photos (`BEFORE_AFTER_CONFIG` in `src/data/siteContent.ts`):**
   - Place real before/after photographs at `public/images/pool-before.webp` and `public/images/pool-after.webp`.
   - Set `useRealPhotos: true` in `BEFORE_AFTER_CONFIG`.
2. **Project Portfolio Photos (`PORTFOLIO_ITEMS` in `src/data/siteContent.ts`):**
   - Add approved project images to `public/images/`, set `imageUrl: '/images/your-photo.webp'`, and set `isPlaceholder: false`.
3. **Customer Reviews (`VERIFIED_CUSTOMER_REVIEWS` in `src/data/siteContent.ts`):**
   - The *"What Our Customers Say"* section is automatically hidden while `VERIFIED_CUSTOMER_REVIEWS` is empty (`[]`). Add verified reviews to display it automatically.
4. **Public Email (`COMPANY_CONTACT.verifiedEmail` in `src/data/siteContent.ts`):**
   - Kept blank until verified with the business owner. Populate `verifiedEmail` only once confirmed.
5. **Contact Form Endpoint (`VITE_CONTACT_FORM_ENDPOINT`):**
   - Create a `.env.local` file and set `VITE_CONTACT_FORM_ENDPOINT=https://your-form-endpoint` when ready.
   - Until configured, submitting the form transparently informs the visitor and provides one-click **Call `+961 3 058 204`** and **Instagram (`@water__cycle`)** actions instead of faking delivery.

---

## 3. Building for Production & Deployment

1. Run the type-checker and unit tests:
   ```bash
   npm run lint
   ```
2. Build the optimized production bundle:
   ```bash
   npm run build
   ```
3. Upload the generated **`dist/`** folder to any static web host (Netlify, Vercel, Cloudflare Pages, cPanel/Apache, or Nginx). Configure your host to serve `index.html` for client-side routes (`/`, `/about`, `/services`, `/our-work`, `/contact`).
