import express from 'express';
import connectDB from './configs/db.js';
import contactRoutes from './routes/contact.route.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins from .env
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(origin => origin.trim())
  : ['http://localhost:3000'];

// Middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Connect to MongoDB
connectDB();  

// Logging middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Routes
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));