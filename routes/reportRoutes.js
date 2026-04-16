import express from 'express';
import { getSalesReport } from '../controllers/reportController.js';   
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Sales Report Route (Protected)
router.get('/sales', authenticate, getSalesReport);

export default router;