# 🍃 Konoha Supply Co.

> Everything a Shinobi Needs.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![Tests](https://img.shields.io/badge/tests-73%20passing-2E7D32)
![Responsive](https://img.shields.io/badge/design-responsive-3D5133)

**Konoha Supply Co.** is a Naruto-inspired fictional e-commerce application set in the Hidden Leaf Village. Browse ninja equipment, discover rare treasures, and fill your pouch with everything you need for your next mission.

Built as the **Shopping Cart** project for [The Odin Project](https://www.theodinproject.com/), this application goes beyond a basic shopping cart by combining a custom product catalog, client-side routing, shared state, automated testing, and an illustrated storefront.

<!-- Add the deployed GitHub Pages URL here once the site is published. -->

## Features

- **Custom product catalog:** 20 illustrated products fetched from a dedicated MockAPI endpoint, with prices in fictional Ryō, descriptions, categories, rarity, and stock information.
- **Home page:** illustrated hero, category collections, featured products, and mission supplies banner.
- **Ninja Shop:** real-time name search, category filtering, result counts, and sorting by price or name in either direction.
- **Shopping cart (Your Inventory):** add and remove products, adjust quantities, merge duplicate additions, and calculate subtotals and order totals automatically.
- **Stock validation:** quantity controls respect available stock and prevent adding out-of-stock products.
- **Shared cart state:** the navigation badge updates as products are added, removed, or adjusted.
- **URL-based category filters:** category links open the shop with the selected filter applied.
- **Loading, error, and empty states:** feedback for API requests, empty search results, and an empty inventory.
- **Responsive design:** layouts adapted for desktop, tablet, and mobile screens.
- **Accessibility:** semantic landmarks, labelled controls, keyboard focus styles, and reduced-motion support.

## Pages

| Page           | Route             | Description                                     |
| -------------- | ----------------- | ----------------------------------------------- |
| Home           | `/` or `/home`    | Explore collections and featured supplies.      |
| Ninja Shop     | `/ninja-shop`     | Browse, search, filter, sort, and add products. |
| Your Inventory | `/your-inventory` | Manage cart items and review order totals.      |

The store is a front-end demonstration. No real orders, payments, accounts, or checkout are implemented. The cart is held in React state and resets when the application is reloaded.

## Tech Stack

| Technology            | Purpose                                                        |
| --------------------- | -------------------------------------------------------------- |
| React                 | Component-based UI and state management                        |
| React Router          | Client-side routing, outlet context, and URL search parameters |
| JavaScript            | Application logic and data manipulation                        |
| Vite                  | Development server and production builds                       |
| CSS3                  | Custom styling, responsive layouts, and visual effects         |
| MockAPI               | Remote product catalog                                         |
| Vitest                | Automated test runner                                          |
| React Testing Library | Component and integration testing                              |
| jsdom                 | DOM environment for tests                                      |
| ESLint                | Static code analysis                                           |

## Architecture

`App.jsx` acts as the shared application layout. It fetches product data, manages cart state, and exposes the catalog and cart operations to nested routes through React Router's outlet context.

Individual pages compose reusable components such as `ProductCard`, `CategoryCards`, `CartItem`, `Navbar`, and `Footer`. The shop derives its filtered and sorted results from the catalog instead of maintaining a separate copy of the product data.

```text
src/
├── App.jsx
├── App.css
├── App.test.jsx
├── main.jsx
├── index.css
├── setupTests.js
├── Pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── Cart.jsx
│   └── ...                 # Page tests
├── components/
│   ├── Brand.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── CategoryCards.jsx
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   ├── PageBanner.jsx
│   ├── DesignIcon.jsx
│   ├── Footer.jsx
│   └── ...                 # Component tests
└── data/
    └── category.js

public/
└── images/
    ├── category/
    ├── design/
    └── products/
```

## Product API

The application retrieves its product catalog using the Fetch API and a dedicated MockAPI resource.

```text
GET https://6af44f3155a1de7dcf03d729.mockapi.io/konoha-supply/products
```

Product illustrations are stored locally as WebP assets. The API provides product data and image filenames. An internet connection is required to load the catalog.

## Getting Started

### Prerequisites

- Node.js 24 LTS (24.15.0 or later within the 24.x release line), or Node.js 22.22.2 or later within the 22.x release line.
- npm
- Git

### Installation

```bash
git clone https://github.com/alex-mate/Konoha-Supply-Co.git
cd Konoha-Supply-Co
npm ci
npm run dev
```

Open the local URL displayed by Vite (usually `http://localhost:5173`).

### Available Commands

| Command            | Description                             |
| ------------------ | --------------------------------------- |
| `npm run dev`      | Start the development server.           |
| `npm run build`    | Create the production build in `dist/`. |
| `npm run preview`  | Preview the production build locally.   |
| `npm test`         | Run tests in watch mode.                |
| `npm run test:run` | Run the complete test suite once.       |
| `npm run lint`     | Check the source code with ESLint.      |

## Testing

The project includes **73 automated tests across 7 test suites**, covering component behavior, page interactions, and application integration.

Tested functionality includes product quantity selection, stock limits, cart updates and removal, navigation badge counts, search, filtering, sorting, featured products, and shared application state.

```bash
npm run test:run
```

Latest verified design build: **73/73 tests passing**, with ESLint and the production build also passing.

## Lighthouse Results

The production preview was audited with Chrome Lighthouse on November 14, 2026.

| Metric         | Mobile | Desktop |
| -------------- | :----: | :-----: |
| Performance    |   93   |   92    |
| Accessibility  |  100   |   100   |
| Best Practices |  100   |   100   |
| SEO            |   92   |   92    |

These are local production-preview results, not guaranteed scores for every device, network, or hosted deployment.

## What I Learned

- Building reusable React components and composing complete application pages.
- Managing shared state, immutable cart updates, and derived values.
- Using React Router for nested routes and URL-based filters.
- Integrating external API data with loading and error handling.
- Writing automated tests for user interactions and application behavior.
- Creating responsive layouts and evaluating production performance.

## Credits

- Developed by [Alex Mate](https://github.com/alex-mate) as part of The Odin Project's Full Stack JavaScript curriculum.
- Visual design and custom illustrations developed with AI assistance.
- Inspired by the fictional world of _Naruto_, created by Masashi Kishimoto.

This is an unofficial, non-commercial educational fan project. It is not affiliated with or endorsed by the Naruto franchise or its rights holders. All related names, characters, and trademarks belong to their respective owners.

---

**Every Shinobi. Every Mission. Every Journey.** 🍃
