# AI Development Rules

This document outlines the rules and conventions for AI-driven development of this application.

## Tech Stack

- **Framework:** React with Vite for a fast development experience.
- **Styling:** Tailwind CSS for all styling. Utility-first CSS for rapid UI development.
- **Icons:** Font Awesome (`@fortawesome/react-fontawesome`) and Lucide React (`lucide-react`) are available for a wide range of icons.
- **Animations:** Framer Motion for smooth and complex animations.
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`) for managing component and application state.
- **Language:** JavaScript (ES6+).

### Backend Tech Stack
- **Backend Framework:** Node.js with Express
- **Backend Database:** MongoDB (using Mongoose ODM)
- **Backend Authentication:** JWT (JSON Web Tokens)
- **Backend Language:** JavaScript (ES6+ Modules)

## Development Rules

- **Styling:**
  - **ALWAYS** use Tailwind CSS for styling. Do not write custom CSS files or use inline `style` attributes unless absolutely necessary for dynamic properties that cannot be handled by Tailwind classes.
  - Utilize the existing theme and colors defined in `tailwind.config.js`.

- **Icons:**
  - **ALWAYS** use icons from the `@fortawesome/react-fontawesome` or `lucide-react` libraries. Do not add other icon libraries.

- **Animations:**
  - **ALWAYS** use the `framer-motion` library for any UI animations.

- **Component Structure (Frontend):**
  - **DO NOT** add more logic to the main `App.jsx` file. It is already very large and should be refactored.
  - **ALWAYS** create new components in a `src/components/` directory.
  - **ALWAYS** create new pages/views in a `src/pages/` directory.
  - Keep components small, focused, and reusable. Each component should have a single responsibility.

- **Component Structure (Backend):**
  - **ALWAYS** adhere to the established backend file structure:
    - `backend/config/`: Environment variables, database connection.
    - `backend/controllers/`: Business logic for API endpoints.
    - `backend/middleware/`: Reusable Express middleware (e.g., authentication, error handling).
    - `backend/models/`: Mongoose schemas for database collections.
    - `backend/routes/`: Defines API endpoints and maps to controllers.
    - `backend/services/`: External integrations or complex reusable logic (e.g., email, payment).
    - `backend/utils/`: Small, pure utility functions (e.g., JWT generation).
    - `backend/validators/`: Input validation for request data (using Joi).
  - Ensure a clear separation of concerns for maintainability and scalability.

- **State Management:**
  - For local component state, use `useState` and `useReducer`.
  - For global state, prefer React Context API (`useContext`) over installing a new state management library like Redux or Zustand unless the complexity absolutely requires it.

- **Dependencies:**
  - **DO NOT** add new libraries without a clear reason. Prefer using the existing tech stack to solve problems.