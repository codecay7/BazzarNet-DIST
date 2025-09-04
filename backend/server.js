import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import error middleware

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Body parser for JSON data
app.use(cors()); // Enable CORS for all routes

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('BazzarNet Backend API is running...');
});

// Mount API routes
app.use('/api/auth', authRoutes); // Mount authentication routes

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});