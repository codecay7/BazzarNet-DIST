# BazzarNet: Local E-commerce Platform

## Project Overview

BazzarNet is a modern, responsive e-commerce platform designed to connect local stores with customers for fast and reliable delivery. It supports both customer and vendor roles, offering a seamless shopping experience for users and powerful product management tools for businesses. The application emphasizes a clean UI, smooth animations, and a robust architecture built with React and a Node.js/Express backend with MongoDB.

## Tech Stack

*   **Frontend Framework:** React (with Vite for a fast development experience)
*   **Frontend Styling:** Tailwind CSS (utility-first for rapid UI development)
*   **Frontend Icons:** Font Awesome (`@fortawesome/react-fontawesome`) and Lucide React (`lucide-react`)
*   **Frontend Animations:** Framer Motion
*   **Frontend State Management:** React Context API (`useContext`), `useState`, `useEffect`, `useMemo`
*   **Frontend Routing:** React Router DOM
*   **Frontend Notifications:** React Hot Toast
*   **Frontend Charting:** Recharts (for vendor analytics)
*   **Frontend Language:** JavaScript (ES6+)
*   **Backend Framework:** Node.js with Express
*   **Backend Database:** MongoDB (using Mongoose ODM)
*   **Backend Authentication:** JWT (JSON Web Tokens)
*   **Backend Language:** JavaScript (ES6+ Modules)

## Key Features

### General
*   **Responsive Design:** Optimized for various screen sizes (mobile, tablet, desktop).
*   **Theming:** Toggle between light and dark modes.
*   **Authentication:** Separate login/registration flows for customers, vendors, and admins.

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

### Admin Features
*   **Admin Dashboard:** Centralized overview of platform metrics (total revenue, active users, vendor/user status, order completion, sales trends).
*   **User Management:** View, activate/deactivate, and delete customer and vendor accounts.
*   **Product Management:** View, edit, and delete all products across all stores.
*   **Order Management:** View all orders, update their status, and initiate refunds.

## Project Structure

The project follows a clear and modular structure for both frontend and backend:

### Frontend (`./src/`)
*   `assets/`: Images and other media.
*   `components/`: Reusable UI components (e.g., `Header`, `Footer`, `Modal`, `StatCard`, `ProductForm`, `Pagination`, `SkeletonCard`, `MobileNav`).
*   `context/`: Global state management using `AppContext.jsx`.
*   `data/`: Mock data (`mockData.js`) for products, stores, orders, etc. (will be replaced by backend API).
*   `hooks/`: Custom React hooks (e.g., `useFormValidation`).
*   `pages/`: Top-level views/pages of the application (e.g., `Dashboard`, `Products`, `Login`, `Register`, `Profile`, `Orders`).
*   `services/`: API service layer (`api.js`) for frontend-backend communication.
*   `App.jsx`: Main application component, handles routing and lazy loading.
*   `main.jsx`: Entry point for the React application.
*   `index.css`: Global Tailwind CSS imports and custom CSS variables for theming.

### Backend (`./backend/`)
*   `config/`:
    *   `db.js`: Database connection setup (MongoDB).
    *   `env.js`: Environment variable loading and validation.
*   `controllers/`: Contains the core business logic for API operations.
    *   `authController.js`: User authentication logic.
    *   `userController.js`: User-related business logic.
    *   `productController.js`: Product-related business logic.
    *   `storeController.js`: Store-related business logic.
    *   `orderController.js`: Order-related business logic.
    *   `adminController.js`: Admin-specific business logic.
*   `middleware/`: Reusable Express middleware.
    *   `authMiddleware.js`: Authentication and authorization checks (JWT).
    *   `errorMiddleware.js`: Centralized error handling.
*   `models/`: Mongoose schemas defining database collections.
    *   `User.js`: Mongoose schema for User.
    *   `Product.js`: Mongoose schema for Product.
    *   `Store.js`: Mongoose schema for Store.
    *   `Order.js`: Mongoose schema for Order.
    *   `Cart.js`: Mongoose schema for Cart (optional, or embedded in User).
*   `routes/`: Defines API endpoints and maps them to controller functions.
    *   `authRoutes.js`: Authentication API endpoints.
    *   `userRoutes.js`: User profile and customer-specific endpoints.
    *   `productRoutes.js`: Public product browsing endpoints.
    *   `storeRoutes.js`: Public store browsing endpoints.
    *   `orderRoutes.js`: Customer/Vendor order endpoints.
    *   `vendorRoutes.js`: Vendor-specific product/order management.
    *   `adminRoutes.js`: Admin-specific management endpoints.
*   `services/`: Encapsulates logic for external integrations or complex reusable logic.
    *   `emailService.js`: Email sending (e.g., order confirmation).
    *   `paymentService.js`: Payment gateway integration.
    *   `otpService.js`: OTP generation and verification.
*   `utils/`: Small, pure utility functions.
    *   `jwt.js`: JWT token generation/verification utilities.
    *   `helpers.js`: General utility functions.
*   `validators/`: Input validation for request data.
    *   `authValidator.js`: Validation for login/registration inputs.
    *   `productValidator.js`: Validation for product creation/update.
    *   `orderValidator.js`: Validation for order placement.
*   `.env`: Environment variables (e.g., `DB_URI`, `JWT_SECRET`).
*   `.gitignore`: Files/folders to ignore in Git.
*   `package.json`: Project metadata and dependencies.
*   `server.js`: Main application entry point.

## How It Works

### Frontend
The application uses React's Context API (`AppContext.jsx`) for global state management. This context provides:
*   User authentication status (`isLoggedIn`, `user`, `isVendor`, `isAdmin`).
*   Theme settings (`theme`, `toggleTheme`).
*   Shopping cart and wishlist data (`cart`, `wishlist`, `addToCart`, `removeFromCart`, etc.).
*   Centralized product and store data (`allAppProducts`, `appStores`).
*   Order data (`orders`, `updateOrderStatus`, `checkout`).
*   Utility functions like `simulateLoading` and `generateOtp`.

Components consume this context using the `useContext` hook to access and modify shared state. `react-router-dom` is used for navigation, with routes lazy-loaded using `React.lazy` and `Suspense` for performance. All styling is done using **Tailwind CSS**.

### Backend
The backend is built with Node.js and Express, connecting to a MongoDB database via Mongoose. It follows a modular architecture with dedicated directories for configuration, models, controllers, routes, middleware, services, utilities, and validators. This structure ensures a clear separation of concerns, making the API robust, scalable, and easy to maintain. Authentication is handled using JWTs, and input validation is enforced for all API requests.

### Data Handling (Currently Mocked, Transitioning to Backend)
Currently, much of the application data (products, stores, orders, user information) is managed using in-memory mock data defined in `src/data/mockData.js` and `AppContext.jsx`. This allows for full frontend functionality.

The `src/services/api.js` file has been introduced to abstract API interactions. The `AppContext.jsx` has been refactored to conceptually integrate with this API layer, showing where actual backend calls will replace the mock logic. The backend setup is now in place to handle persistent data storage and user authentication.

## Running the Project Locally

To get the BazzarNet application up and running on your local machine, follow these steps:

1.  **Frontend Setup:**
    *   Navigate to the project root directory (where `package.json` for the frontend is).
    *   Install dependencies: `npm install`
    *   Start the development server: `npm run dev`
    *   This will start the Vite development server, usually at `http://localhost:5173`.

2.  **Backend Setup:**
    *   Navigate to the `backend/` directory.
    *   Create a `.env` file and populate it with your MongoDB URI, JWT secret, and email service credentials (see `backend/.env` example). **Remember to replace placeholders with your actual credentials.**
    *   Install dependencies: `npm install`
    *   Start the development server: `npm run dev`
    *   This will start the Node.js/Express server, usually at `http://localhost:5000`.

## Development Guidelines

*   **Styling:** Always use Tailwind CSS. Avoid custom CSS files or inline styles unless absolutely necessary.
*   **Components:** Keep components small, focused, and reusable. New components should be created in `src/components/`.
*   **Pages:** New views should be created in `src/pages/`.
*   **State:** Prefer React Context for global state.
*   **Dependencies:** Avoid adding new libraries unless there's a clear and strong justification.
*   **Backend Modularity:** Adhere to the established backend file structure (models, controllers, routes, middleware, services, utils, validators).

## Future Enhancements

*   Full integration with the backend for persistent data storage and real user authentication.
*   Advanced search and filtering options for products and stores.
*   Real-time order tracking with map integration.
*   User reviews and ratings system for products and stores.
*   Payment gateway integration for actual transactions.
*   More comprehensive vendor analytics and reporting.
*   Admin dashboard for overall platform management.