![Walmart Logo](Project_SS/Walmart_logo_(2025;_Alt).svg)

# Walmart_v1

A modern e-commerce web application inspired by Walmart, built with React, TypeScript, Vite, and Redux Toolkit. This project demonstrates a scalable architecture for online shopping platforms, featuring authentication, product browsing, cart, wishlist, and order management.

## Features

- **Home Page**: Showcases featured products and deals.
- **Product Search**: Search and filter products by category or keyword.
- **Product Details**: View detailed information for each product.
- **Cart**: Add, remove, and update products in the shopping cart.
- **Wishlist**: Save products for later (requires login).
- **Orders**: View order history (requires login).
- **Authentication**: Protected routes for user-specific pages.
- **Dark Mode**: Theme toggle with persistent storage.
- **Responsive Design**: Works on desktop and mobile devices.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)
- [Redux Thunk](https://redux.js.org/usage/writing-logic-thunks)
- [React Router DOM](https://reactrouter.com/)
- [ESLint](https://eslint.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [tweakcn](https://github.com/steven-tey/tweakcn)
- [Auth0](https://auth0.com/)
- [lucide-react](https://lucide.dev/)
- [react-bits](https://github.com/vasanthk/react-bits)
- [Platzi Fake Store API](https://fakeapi.platzi.com/)
- [exalidraw](https://excalidraw.com/)
- [gsap](https://gsap.com/)
- [three.js](https://threejs.org/)


## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Walmart_v1.git
   cd Walmart_v1
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Auth0 Configuration

To enable authentication, you need to configure Auth0:

1. **Create an Auth0 Application:**
   - Go to [Auth0 Dashboard](https://manage.auth0.com/).
   - Create a new application (type: Single Page Application).
   - Note your **Domain** and **Client ID**.

2. **Configure Environment Variables:**
   - Create a `.env` file in the root of your project (if not already present).
   - Add the following variables:
     ```env
     VITE_AUTH0_DOMAIN=your-auth0-domain
     VITE_AUTH0_CLIENT_ID=your-auth0-client-id
     VITE_AUTH0_AUDIENCE=your-auth0-audience (if required)
     ```
   - Replace the values with those from your Auth0 dashboard.

3. **Update Auth0 Callback URLs:**
   - In your Auth0 application settings, add `http://localhost:5173` to the **Allowed Callback URLs** and **Allowed Logout URLs**.

4. **Integrate Auth0 in the App:**
   - The project uses Auth0 React SDK. Make sure the provider is set up in your app (see the relevant code in your `src` directory).

For more details, see the [Auth0 React Quickstart](https://auth0.com/docs/quickstart/spa/react).

## Project Structure

```
.  
├── Project_SS
│   ├── Screenshot 2025-06-28 110644.png
│   ├── Screenshot 2025-06-28 110719.png
│   ├── Screenshot 2025-06-28 110744.png
│   ├── Screenshot 2025-06-28 110816.png
│   ├── Screenshot 2025-06-28 110922.png
│   ├── Screenshot 2025-06-28 110958.png
│   └── Walmart_logo_(2025;_Alt).svg
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Cart.tsx
│   │   ├── Category.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── Deals.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Home.tsx
│   │   ├── Homegrid.tsx
│   │   ├── Navbar.tsx
│   │   ├── Notfound.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDesPage.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── SearchProductList.tsx
│   │   ├── SearchResults.tsx
│   │   ├── Wishlist.tsx
│   │   ├── login.tsx
│   │   ├── logout.tsx
│   │   ├── magicui
│   │   │   ├── animated-grid-pattern.tsx
│   │   │   ├── dot-pattern.tsx
│   │   │   ├── grid-pattern.tsx
│   │   │   ├── interactive-grid-pattern.tsx
│   │   │   ├── ripple.tsx
│   │   │   └── warp-background.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── profile.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       └── toggle.tsx
│   ├── constants
│   │   └── grid.tsx
│   ├── grid
│   │   ├── Item10.tsx
│   │   ├── Item11.tsx
│   │   ├── Item8.tsx
│   │   └── Item9.tsx
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── store
│   │   ├── ReduxProvider.tsx
│   │   ├── cartSlice.ts
│   │   ├── index.ts
│   │   ├── orderSlice.ts
│   │   ├── productsSlice.ts
│   │   └── wishlistSlice.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Screenshots

The following screenshots from the `Project_SS` folder showcase the application:

<table>
  <tr>
    <td><img src="Project_SS/Screenshot%202025-06-28%20110644.png" alt="Home Page Screenshot" width="250"/></td>
    <td><img src="Project_SS/Screenshot%202025-06-28%20110719.png" alt="Product List Screenshot" width="250"/></td>
    <td><img src="Project_SS/Screenshot%202025-06-28%20110744.png" alt="Product Details Screenshot" width="250"/></td>
  </tr>
  <tr>
    <td><img src="Project_SS/Screenshot%202025-06-28%20110816.png" alt="Cart Screenshot" width="250"/></td>
    <td><img src="Project_SS/Screenshot%202025-06-28%20110922.png" alt="Wishlist Screenshot" width="250"/></td>
    <td><img src="Project_SS/Screenshot%202025-06-28%20110958.png" alt="Orders Screenshot" width="250"/></td>
  </tr>
</table>

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
