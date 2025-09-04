import express from 'express';
import cors from 'cors';
import env from './config/env.js'; // Import environment variables
import connectDB from './config/db.js'; // Import database connection function

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

// TODO: Mount API routes here (e.g., app.use('/api/auth', authRoutes);)
// TODO: Implement and mount error handling middleware here

// Start the server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});