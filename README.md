# FakeStore

This project is a single-page application (SPA) built with SvelteKit, Tailwind CSS, and TypeScript. It displays a list of products fetched from the Fake Store API, allows users to view product details, filter products by category and price range, and add products to a shopping cart with real-time updates and notifications.

## Features

- Display products in grid or list format with relevant information (e.g., name, price, image).
- Toggle between grid and list view.
- Show 2 items per row in grid mode.
- Infinite scrolling with skeleton loader animation for new items.
- Filter products by categories and price range.
- Real-time cart updates with item addition and removal.
- Cart page with functionality to increase/decrease item quantity and remove items.
- Notifications for adding products to the cart.
- Seamless navigation to the cart page without reloading.

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fake Store API](https://fakestoreapi.com/)
- [Lucide Icons](https://lucide.dev/)
- [Svelte-Toast](https://github.com/zerodevx/svelte-toast)

## Setup and Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/Ankur02Sarkar/FakeStore
   cd FakeStore
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Run the development server:**

   ```
   npm run dev
   ```

4. **Open your browser and navigate to:**

   ```
   http://localhost:5173
   ```

## Project Structure

```
FakeStore/
├── src/
│   ├── lib/
│   │   ├── api.ts                 # API service for fetching data
│   │   ├── store.ts               # State management
│   │   ├── components/
│   │   │   └── SkeletonLoader.svelte # Skeleton loader component
│   ├── routes/
│   │   ├── product/
│   │   │   ├── [id]/
│   │   │   │   └── +page.svelte   # Product details page
│   │   ├── cart/
│   │   │   └── +page.svelte       # Cart page
│   │   ├── +layout.svelte         # Layout component
│   │   ├── +page.svelte           # Main product listing page
│   ├── app.postcss                # Tailwind CSS configuration
│   ├── app.d.ts                   # TypeScript definitions
│   ├── app.html                   # Main HTML file
├── static/
│   ├── favicon.png                # Favicon
├── tailwind.config.cjs            # Tailwind CSS configuration
├── svelte.config.js               # Svelte configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies and scripts
├── package-lock.json              # Lockfile
├── postcss.config.cjs             # PostCSS configuration

```

## How it can Help

This project serves as a comprehensive example of building a modern e-commerce web application with SvelteKit, Tailwind CSS, and TypeScript. It demonstrates:

- Efficient state management using Svelte stores.
- Real-time UI updates with reactive programming.
- Building responsive and accessible UI components with Tailwind CSS.
- Implementing infinite scrolling and skeleton loaders for better user experience.
- Integrating third-party libraries for notifications and icons.
- Using TypeScript for type safety and better development experience.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
