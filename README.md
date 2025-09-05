# BazzarNet: Local E-commerce Platform

## Project Overview

BazzarNet is a modern, responsive e-commerce platform designed to connect local stores with customers for fast and reliable delivery. It supports three distinct user roles: customers, vendors, and administrators, each with tailored functionalities. The application emphasizes a clean UI, smooth animations, and a robust architecture built with React for the frontend and a Node.js/Express backend with MongoDB.

## Key Features

### General
*   **Responsive Design:** Optimized for various screen sizes (mobile, tablet, desktop).
*   **Theming:** Toggle between light and dark modes.
*   **Authentication:** Separate login/registration flows for customers, vendors, and admins using JWT.
*   **Image Uploads:** Integrated image upload functionality for products, store logos, and user profiles.
*   **Form Validation:** Robust input validation on both frontend (custom hook) and backend (Joi).
*   **Notifications:** User-friendly toast notifications for important events.

### Customer Features
*   **Product Browsing:** View all products or filter by store/category.
*   **Store Browsing:** Discover local stores and their product offerings, filtered by user's pincode.
*   **Product Details:** Detailed view of individual products with pricing, descriptions, ratings, and the ability to leave reviews.
*   **Shopping Cart:** Add, update quantities, and remove items from the cart.
*   **Wishlist:** Save products for later.
*   **Checkout Process:** Multi-step checkout with address management, coupon application, and UPI QR payment (mocked).
*   **Order Confirmation:** Displays order summary, OTP, and QR code for delivery.
*   **Order Tracking:** View past orders and their current status with a visual tracker.
*   **Profile Management:** View and edit personal contact, address, and payment information.
*   **Customer Dashboard:** Overview of cart, wishlist, total orders, recommended products, and products awaiting review.

### Vendor Features
*   **Vendor Dashboard:** Overview of total revenue, orders, customers, and products. Includes sales analytics and fast-selling items.
*   **Product Management:** Add, edit, and delete products for their store.
*   **Order Management:** View and update the status of incoming orders, confirm delivery with OTP.
*   **Payments Overview:** Track payment statuses for their sales.
*   **Profile Management:** View and edit business details, legal information (PAN, GST), payment information (bank, UPI), and store logo.

### Admin Features
*   **Admin Dashboard:** Centralized overview of platform metrics (total revenue, active users, vendor/user status, order completion, sales trends).
*   **User Management:** View, activate/deactivate, and delete customer and vendor accounts.
*   **Product Management:** View, edit, and delete all products across all stores.
*   **Order Management:** View all orders, update their status, and initiate refunds.
*   **Store Management:** View, activate/deactivate, edit, and delete all stores.

## Tech Stack

### Frontend
*   **Framework:** React (with Vite for a fast development experience)
*   **Styling:** Tailwind CSS (utility-first for rapid UI development)
*   **Icons:** Font Awesome (`@fortawesome/react-fontawesome`) and Lucide React (`lucide-react`)
*   **Animations:** Framer Motion
*   **State Management:** React Context API (`useContext`), `useState`, `useEffect`, `useMemo`
*   **Routing:** React Router DOM
*   **Notifications:** React Hot Toast
*   **Charting:** Recharts (for vendor and admin analytics)
*   **QR Code Generation:** `react-qr-code`
*   **Language:** JavaScript (ES6+)

### Backend
*   **Framework:** Node.js with Express
*   **Database:** MongoDB (using Mongoose ODM)
*   **Authentication:** JWT (JSON Web Tokens)
*   **Validation:** Joi
*   **Email Service:** Nodemailer
*   **File Uploads:** Multer (for local storage, can be extended to cloud storage like Cloudinary)
*   **Security:** `express-mongo-sanitize`, `xss-clean`, `express-rate-limit`
*   **Language:** JavaScript (ES6+ Modules)

## Architecture

The project follows a clear and modular structure for both frontend and backend, promoting maintainability and scalability.

### Frontend (`./src/`)
*   `assets/`: Images and other media.
*   `components/`: Reusable UI components (e.g., `Header`, `Footer`, `Modal`, `StatCard`, `ProductForm`, `Pagination`, `SkeletonCard`, `MobileNav`, `SupportForm`, `ReviewForm`, `ProductCard`, `CustomerProfileForm`, `VendorProfileForm`, `LoginButton`, `Loader`, `CheckoutSteps`, `CouponSection`, `OrderSummary`, `QrPaymentForm`).
*   `context/`: `AppContext.jsx` for global state management, centralizing authentication, theme, cart, wishlist, products, stores, orders, users, and coupons.
*   `hooks/`: Custom React hooks encapsulating logic (e.g., `useFormValidation`, `useAuth`, `useProducts`, `useCart`, `useOrders`, `useUsers`, `useCoupons`).
*   `pages/`: Top-level views/pages of the application (e.g., `Dashboard`, `Products`, `Login`, `Register`, `Profile`, `Orders`, `AdminDashboard`, `ManageProducts`).
*   `routes/`: Defines application routing based on user roles (`PublicRoutes`, `CustomerRoutes`, `VendorRoutes`, `AdminRoutes`).
*   `services/`: `api.js` for abstracting all frontend-backend API interactions.
*   `utils/`: Small, pure utility functions (e.g., `imageUtils.js` for image URL handling).
*   `App.jsx`: Main application component, responsible for rendering routes based on user authentication and role.
*   `main.jsx`: Entry point for the React application.
*   `index.css`: Global Tailwind CSS imports and custom CSS variables for theming.

### Backend (`./backend/`)
*   `config/`:
    *   `db.js`: Database connection setup (MongoDB).
    *   `env.js`: Environment variable loading and validation.
*   `controllers/`: Contains the core business logic for API operations (e.g., `authController`, `productController`, `orderController`, `adminController`).
*   `middleware/`: Reusable Express middleware (e.g., `authMiddleware` for JWT, `errorMiddleware` for centralized error handling, `validationMiddleware` for Joi, `uploadMiddleware` for Multer, `rateLimitMiddleware` for security).
*   `models/`: Mongoose schemas defining database collections (e.g., `User`, `Product`, `Store`, `Order`, `Cart`, `Wishlist`, `Payment`, `Coupon`, `Review`).
*   `routes/`: Defines API endpoints and maps them to controller functions (e.g., `authRoutes`, `userRoutes`, `productRoutes`, `adminRoutes`).
*   `services/`: Encapsulates logic for external integrations (e.g., `emailService` for Nodemailer).
*   `utils/`: Small, pure utility functions (e.g., `jwt.js` for JWT token generation/verification, `helpers.js` for OTP generation).
*   `validators/`: Joi schemas for input validation for various data models.
*   `seeder.js`: Script to populate the database with sample data for development.
*   `server.js`: Main application entry point, handles database connection, middleware setup, and route registration.
*   `uploads/`: Directory for locally stored uploaded images.

## Workflow

### Authentication and Authorization
*   Users register as `customer`, `vendor`, or `admin`.
*   Login generates a JWT, stored client-side, and user data is saved in `AppContext`.
*   `authMiddleware` on the backend protects routes, verifying JWTs and attaching user information to the request.
*   `authorizeRoles` middleware restricts access to specific roles (e.g., only `vendor` can manage products).

### Data Flow
1.  **Frontend Interaction:** User actions trigger functions from `AppContext` (e.g., `addToCart`, `fetchOrders`).
2.  **API Service Layer:** `AppContext` functions call methods in `src/services/api.js`.
3.  **HTTP Request:** `api.js` constructs and sends HTTP requests (GET, POST, PUT, DELETE) to the backend API endpoints, including the JWT for authenticated requests.
4.  **Backend Processing:**
    *   **Routes:** Express routes (`backend/routes/`) match the incoming request to a controller function.
    *   **Middleware:** Requests pass through middleware:
        *   `rateLimitMiddleware`: Prevents abuse.
        *   `mongoSanitize`, `xss-clean`: Security against injection attacks.
        *   `authMiddleware`: Authenticates the user via JWT.
        *   `validationMiddleware`: Validates request body using Joi schemas.
    *   **Controllers:** Business logic (`backend/controllers/`) is executed, interacting with Mongoose models (`backend/models/`) to perform database operations.
    *   **Services/Utilities:** Controllers may use `backend/services/` (e.g., `emailService`) or `backend/utils/` (e.g., `jwt.js`, `helpers.js`).
5.  **Response:** The backend sends a JSON response back to the frontend.
6.  **Frontend Update:** The `AppContext` updates its state based on the response, triggering re-renders in relevant components.

### Key Workflows

*   **Product Management (Vendor):** Vendors use `ManageProducts` page to `addVendorProduct`, `editVendorProduct`, `deleteVendorProduct` via `api.vendor` calls. Image uploads are handled by `api.upload`.
*   **Order Placement (Customer):**
    1.  Customer adds items to cart (`addToCart`).
    2.  Proceeds to `Checkout` (multi-step form).
    3.  `ShippingAddressForm` collects address, which is saved to user profile.
    4.  `CouponSection` allows applying discounts via `api.coupon.validate`.
    5.  `OrderSummary` displays final details.
    6.  `QrPaymentForm` handles UPI QR payment and transaction ID input.
    7.  `checkout` function (in `useCart`) calls `api.customer.placeOrder`.
    8.  Backend `placeOrder` controller performs:
        *   Stock validation and decrement (within a MongoDB transaction).
        *   Creates `Order` and `Payment` records.
        *   Updates `Coupon` usage.
        *   Generates a `deliveryOtp`.
        *   Sends an order confirmation email.
    9.  Customer is redirected to `OrderConfirmation` with order details, OTP, and QR code.
*   **Order Confirmation (Vendor):** Vendors view orders on `Orders` page. On `OrderDetails` page, they can `confirmDeliveryWithOtp` by entering the customer's OTP, which updates the order status to 'Delivered'.
*   **Profile Management:** Users (customer/vendor) can update their profile via `Profile` page, using `api.userProfile.updateProfile` and `api.userProfile.uploadProfileImage`.
*   **Admin Operations:** Admins use dedicated pages (`AdminUserManagement`, `AdminProductManagement`, `AdminStoreManagement`, `AdminOrderManagement`) to manage platform data, calling `api.admin` methods.

## Running the Project Locally

To get the BazzarNet application up and running on your local machine, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd bazzarnet
    ```

2.  **Backend Setup:**
    *   Navigate to the `backend/` directory: `cd backend`
    *   Install dependencies: `npm install`
    *   Create a `.env` file in the `backend/` directory and populate it with your MongoDB URI, JWT secret, and email service credentials.
        ```
        NODE_ENV=development
        PORT=5000
        MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/bazzarnet?retryWrites=true&w=majority
        JWT_SECRET=your_jwt_secret_key
        JWT_EXPIRES_IN=1h
        EMAIL_HOST=smtp.ethereal.email # or your SMTP host
        EMAIL_PORT=587 # or your SMTP port (e.g., 465 for SSL)
        EMAIL_USER=your_email@example.com # or ethereal.email user
        EMAIL_PASS=your_email_password # or ethereal.email password
        FRONTEND_URL=http://localhost:5173
        ADMIN_EMAIL=admin@example.com # Email for receiving support requests
        ```
        **Remember to replace placeholders with your actual credentials.** For `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`, you can use [Ethereal Email](https://ethereal.email/) for testing during development.
    *   Start the backend development server: `npm run dev`
    *   This will start the Node.js/Express server, usually at `http://localhost:5000`. If the database is empty, it will automatically seed initial data (customers, vendors, products).

3.  **Frontend Setup:**
    *   Navigate back to the project root directory (where the frontend `package.json` is): `cd ..`
    *   Install dependencies: `npm install`
    *   Create a `.env` file in the project root (same level as `package.json`) and add the frontend API base URL:
        ```
        VITE_API_BASE_URL=http://localhost:5000/api
        ```
    *   Start the frontend development server: `npm run dev`
    *   This will start the Vite development server, usually at `http://localhost:5173`.

4.  **Access the Application:**
    *   Open your web browser and navigate to `http://localhost:5173`.

## Development Guidelines

*   **Styling:** Always use Tailwind CSS. Avoid custom CSS files or inline styles unless absolutely necessary.
*   **Components:** Keep components small, focused, and reusable. New components should be created in `src/components/`.
*   **Pages:** New views should be created in `src/pages/`.
*   **State:** Prefer React Context for global state.
*   **Dependencies:** Avoid adding new libraries unless there's a clear and strong justification.
*   **Backend Modularity:** Adhere to the established backend file structure (models, controllers, routes, middleware, services, utils, validators).