# AI Development Rules

This document outlines the rules and conventions for AI-driven development of this application.

## Tech Stack

- **Framework:** React with Vite for a fast development experience.
- **Styling:** Tailwind CSS for all styling. Utility-first CSS for rapid UI development.
- **Icons:** Font Awesome (`@fortawesome/react-fontawesome`) and Lucide React (`lucide-react`) are available for a wide range of icons.
- **Animations:** Framer Motion for smooth and complex animations.
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`) for managing component and application state.
- **Language:** JavaScript (ES6+).

## Development Rules

- **Styling:**
  - **ALWAYS** use Tailwind CSS for styling. Do not write custom CSS files or use inline `style` attributes unless absolutely necessary for dynamic properties that cannot be handled by Tailwind classes.
  - Utilize the existing theme and colors defined in `tailwind.config.js`.

- **Icons:**
  - **ALWAYS** use icons from the `@fortawesome/react-fontawesome` or `lucide-react` libraries. Do not add other icon libraries.

- **Animations:**
  - **ALWAYS** use the `framer-motion` library for any UI animations.

- **Component Structure:**
  - **DO NOT** add more logic to the main `App.jsx` file. It is already very large and should be refactored.
  - **ALWAYS** create new components in a `src/components/` directory.
  - **ALWAYS** create new pages/views in a `src/pages/` directory.
  - Keep components small, focused, and reusable. Each component should have a single responsibility.

- **State Management:**
  - For local component state, use `useState` and `useReducer`.
  - For global state, prefer React Context API (`useContext`) over installing a new state management library like Redux or Zustand unless the complexity absolutely requires it.

- **Dependencies:**
  - **DO NOT** add new libraries without a clear reason. Prefer using the existing tech stack to solve problems.