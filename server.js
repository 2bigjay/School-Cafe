import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();


// import database configuration
import connectDB from './config/db.js';

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
import authRoutes from './routes/authRoutes.js';
import attendantRoutes from './routes/attendantRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

//API routes
app.use("/api/auth", authRoutes);
app.use("/api/attendants", attendantRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/students", studentRoutes);
app.use('/api/reports', reportRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({'Welcome to the School Cafeteria System API': 'Hello, World! '});
});

// Connect to the database
connectDB();

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
