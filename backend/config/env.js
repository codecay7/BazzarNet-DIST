import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587', 10),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};

// Basic validation to ensure critical variables are set
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'EMAIL_HOST', 'EMAIL_USER', 'EMAIL_PASS'];
for (const key of requiredEnvVars) {
  if (!env[key]) {
    console.error(`Error: Environment variable ${key} is not set.`);
    process.exit(1); // Exit the process if a critical variable is missing
  }
}

export default env;