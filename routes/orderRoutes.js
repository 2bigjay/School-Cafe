import express from 'express';
import {
    createOrder,
    getAllOrders,
    getAllOrdersById,
    updateOrderStatus
} from '../controllers/OrderController.js';
import authenticate from '../middlewares/auth.js';
import {
    validateCreateOrder,
    validateUpdateOrderStatus
} from '../middlewares/validation.js';

const router = express.Router();

// Create a new order
router.post('/', authenticate, 
    validateCreateOrder, 
    createOrder
);

// Get all orders
router.get('/', getAllOrders);

// Get a specific order by ID
router.get('/:id', 
    getAllOrdersById
);

// Update order status
router.put('/:id/status', 
    authenticate, 
    validateUpdateOrderStatus, 
    updateOrderStatus
);

export default router;