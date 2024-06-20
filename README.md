# FakeStore

This project is a single-page application (SPA) built with SvelteKit, Tailwind CSS, and TypeScript. It displays a list of products fetched from the Fake Store API, allows users to view fake ecommerce products details. The Project includes filtering products by category and price range, and add products to a shopping cart with real-time updates and notifications.

## Features

- Display products in grid or list format with relevant information (e.g., name, price, image).
- Toggle between grid and list view.
- Infinite scrolling with skeleton loader animation for new items.
- Filter products by categories and price range.
- Real-time cart updates with item addition and removal.
- Cart page with functionality to increase/decrease item quantity and remove items.
- Notifications for adding products to the cart.

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fake Store API](https://fakestoreapi.com/)
- [Lucide Icons](https://lucide.dev/)
- [Svelte Sonner](https://svelte-sonner.vercel.app/)

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
├── .env                                  # Environment variables file
├── .github/
│   ├── workflows/
│   │   ├── main.yml                      # YAML File for CI/CD Workflow
├── src/
│   ├── app.css                           # Main CSS file
│   ├── app.d.ts                          # TypeScript definitions
│   ├── app.html                          # Main HTML file
│   ├── index.test.ts                     # Index test file
│   ├── lib/
│   │   ├── api.ts                        # API service for fetching data
│   │   ├── components/
│   │   │   ├── AllProducts/
│   │   │   │   ├── AllProducts.svelte    # All products component
│   │   │   │   ├── AllProducts.test.ts   # All products test file
│   │   │   │   ├── index.ts              # All products index
│   │   │   ├── DarkModeToggle/
│   │   │   │   ├── DarkModeToggle.svelte # Dark mode toggle component
│   │   │   │   ├── DarkModeToggle.test.ts # Dark mode toggle test file
│   │   │   │   ├── index.ts              # Dark mode toggle index
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.svelte         # Footer component
│   │   │   │   ├── index.ts              # Footer index
│   │   │   ├── Navbar/
│   │   │   │   ├── index.ts              # Navbar index
│   │   │   │   ├── Navbar.svelte         # Navbar component
│   │   │   │   ├── Navbar.test.ts        # Navbar test file
│   │   │   ├── SkeletonLoader.svelte     # Skeleton loader component
│   │   │   ├── ui/
│   │   │   │   ├── BentoGrid/
│   │   │   │   │   ├── BentoGrid.svelte  # Bento grid component
│   │   │   │   │   ├── BentoGridItem.svelte # Bento grid item component
│   │   │   │   │   ├── index.ts          # Bento grid index
│   │   │   │   ├── DirectionAwareHover/
│   │   │   │   │   ├── DirectionAwareHover.svelte # Direction aware hover component
│   │   │   │   │   ├── index.ts          # Direction aware hover index
│   │   ├── index.ts                      # Library index
│   │   ├── store.ts                      # State management
│   │   ├── types.ts                      # TypeScript types
│   │   ├── utils/
│   │   │   ├── cn.ts                     # Utility file
│   │   ├── utils.ts                      # Utility file
│   ├── routes/
│   │   ├── +layout.svelte                # Layout component
│   │   ├── +page.svelte                  # Main product listing page
│   │   ├── cart/
│   │   │   ├── +page.svelte              # Cart page
│   │   │   ├── Cart.test.ts              # Cart test file
│   │   ├── product/
│   │   │   ├── [id]/
│   │   │   │   ├── +page.svelte          # Product details page
├── static/
│   ├── favicon.png                       # Favicon
├── .gitignore                            # Git ignore file
├── .npmrc                                # npm configuration file
├── .prettierignore                       # Prettier ignore file
├── .prettierrc                           # Prettier configuration file
├── components.json                       # Components configuration file
├── eslint.config.js                      # ESLint configuration file
├── foldertest.cjs                        # Test file
├── package-lock.json                     # Lockfile
├── package.json                          # Project dependencies and scripts
├── playwright.config.ts                  # Playwright configuration file
├── postcss.config.js                     # PostCSS configuration
├── README.md                             # Project README file
├── svelte.config.js                      # Svelte configuration
├── tailwind.config.ts                    # Tailwind CSS configuration
├── todos.todo                            # TODO list
├── tsconfig.json                         # TypeScript configuration
├── vite.config.ts                        # Vite configuration
```

## How it can Help

This project serves as a comprehensive example of building a modern e-commerce web application with SvelteKit, Tailwind CSS, and TypeScript. It demonstrates:

- Efficient state management using Svelte stores.
- Real-time UI updates with reactive programming.
- Building responsive and accessible UI components with Tailwind CSS.
- Implementing infinite scrolling and skeleton loaders for better user experience.
- Integrating third-party libraries for notifications and icons.
- Using TypeScript for type safety and better development experience.
