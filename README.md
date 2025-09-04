# BazzarNet: Local E-commerce Platform

## Project Overview

BazzarNet is a modern, responsive e-commerce platform designed to connect local stores with customers for fast and reliable delivery. It supports both customer and vendor roles, offering a seamless shopping experience for users and powerful product management tools for businesses. The application emphasizes a clean UI, smooth animations, and a robust architecture built with React.

## Tech Stack

*   **Framework:** React (with Vite for a fast development experience)
*   **Styling:** Tailwind CSS (utility-first for rapid UI development)
*   **Icons:** Font Awesome (`@fortawesome/react-fontawesome`) and Lucide React (`lucide-react`)
*   **Animations:** Framer Motion
*   **State Management:** React Context API (`useContext`), `useState`, `useEffect`, `useMemo`
*   **Routing:** React Router DOM
*   **Notifications:** React Hot Toast
*   **Charting:** Recharts (for vendor analytics)
*   **Language:** JavaScript (ES6+)

## Key Features

### General
*   **Responsive Design:** Optimized for various screen sizes (mobile, tablet, desktop).
*   **Theming:** Toggle between light and dark modes.
*   **Authentication:** Separate login/registration flows for customers and vendors.

### Customer Features
*   **Product Browsing:** View all products or filter by store/category.
*   **Store Browsing:** Discover local stores and their product offerings.
*   **Product Details:** Detailed view of individual products with pricing, descriptions, and ratings.
*   **Shopping Cart:** Add, update quantities, and remove items from the cart.
*   **Wishlist:** Save products for later.
*   **Checkout Process:** Multi-step checkout with address and payment options (mocked).
*   **Order Confirmation:** Displays order summary, OTP, and QR code for delivery.
*   **Order Tracking:** View past orders and their current status.
*   **Profile Management:** View and edit personal contact and payment information.
*   **Customer Dashboard:** Overview of cart, wishlist, and total orders, along with recommended products.

### Vendor Features
*   **Vendor Dashboard:** Overview of total revenue, orders, customers, and products. Includes sales analytics and fast-selling items.
*   **Product Management:** Add, edit, and delete products for their store.
*   **Order Management:** View and update the status of incoming orders, confirm delivery with OTP.
*   **Payments Overview:** Track payment statuses for their sales.
*   **Profile Management:** View and edit business details, legal information, and payment information.

## Project Structure

The project follows a clear and modular structure:

*   `public/`: Static assets.
*   `src/`: Main application source code.
    *   `assets/`: Images and other media.
    *   `components/`: Reusable UI components (e.g., `Header`, `Footer`, `Modal`, `StatCard`, `ProductForm`, `Pagination`, `SkeletonCard`, `MobileNav`).
    *   `context/`: Global state management using `AppContext.jsx`.
    *   `data/`: Mock data (`mockData.js`) for products, stores, orders, etc.
    *   `pages/`: Top-level views/pages of the application (e.g., `Dashboard`, `Products`, `Login`, `Register`, `Profile`, `Orders`).
    *   `App.jsx`: Main application component, handles routing.
    *   `main.jsx`: Entry point for the React application.
    *   `index.css`: Global Tailwind CSS imports and custom CSS variables for theming.

## How It Works

### State Management
The application uses React's Context API (`AppContext.jsx`) for global state management. This context provides:
*   User authentication status (`isLoggedIn`, `user`, `isVendor`).
*   Theme settings (`theme`, `toggleTheme`).
*   Shopping cart and wishlist data (`cart`, `wishlist`, `addToCart`, `removeFromCart`, etc.).
*   Centralized product and store data (`allAppProducts`, `appStores`).
*   Order data (`orders`, `updateOrderStatus`, `checkout`).
*   Utility functions like `simulateLoading` and `generateOtp`.

Components consume this context using the `useContext` hook to access and modify shared state.

### Routing
`react-router-dom` is used for navigation. The `App.jsx` file defines routes, separating them based on the user's login status and role (customer/vendor) to ensure appropriate access control. `Layout.jsx` and `PublicLayout.jsx` provide consistent headers and footers for logged-in and public routes, respectively.

### Styling
All styling is done using **Tailwind CSS**. Custom colors and variables are defined in `tailwind.config.js` and `src/index.css` to maintain a consistent brand identity and enable easy theme switching. CSS variables (`--bg`, `--card-bg`, `--accent`, etc.) are used to implement the light/dark theme toggle.

### Data Handling (Mocked)
Currently, all application data (products, stores, orders, user information) is managed using in-memory mock data defined in `src/data/mockData.js`. This allows for full frontend functionality without a backend. When a user logs in or registers, their details are stored in `localStorage` to persist the session.

### Animations
`framer-motion` is integrated for smooth UI transitions and animations, enhancing the user experience, particularly in modals, mobile navigation, and form transitions.

## Running the Project Locally

To get the BazzarNet application up and running on your local machine, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, and you can access the application in your browser, usually at `http://localhost:5173`.

## Development Guidelines

*   **Styling:** Always use Tailwind CSS. Avoid custom CSS files or inline styles unless absolutely necessary.
*   **Components:** Keep components small, focused, and reusable. New components should be created in `src/components/`.
*   **Pages:** New views should be created in `src/pages/`.
*   **State:** Prefer React Context for global state.
*   **Dependencies:** Avoid adding new libraries unless there's a clear and strong justification.

## Future Enhancements

*   Integration with a real backend (e.g., Supabase, Firebase, custom API) for persistent data storage and user authentication.
*   Advanced search and filtering options for products and stores.
*   Real-time order tracking with map integration.
*   User reviews and ratings system for products and stores.
*   Payment gateway integration for actual transactions.
*   More comprehensive vendor analytics and reporting.
*   Admin dashboard for overall platform management.