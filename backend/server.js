import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Import admin routes
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes); // Mount admin routes

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});