import express from 'express';
import {
    getFoodItemById,
    getAllFoodItems,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem
} from '../controllers/foodController.js';
import { 
    validateCreateFoodItem,
    validateUpdateFoodItem,
    validateFoodItemId,
    handleValidationErrors
} from '../middlewares/validation.js';
import {authenticate} from '../middlewares/auth.js';
const router = express.Router();

// ====================== PUBLIC ROUTES ======================

// Get all books (with pagination & search) - Public
router.get('/', getAllFoodItems);

// Get single foodItem - Public
router.get('/:id', 
    validateFoodItemId,
    handleValidationErrors,
    getFoodItemById
);

// ====================== AUTHENTICATED ROUTES ======================

// Create a new foodItem (Protected)
router.post('/', 
    authenticate, 
    validateCreateFoodItem, 
    handleValidationErrors, 
    createFoodItem
);

// Update foodItem (Protected)
router.put('/:id', 
    authenticate, 
    validateFoodItemId,
    validateUpdateFoodItem,
    handleValidationErrors,
    updateFoodItem
);

// Delete foodItem3 (Protected)
router.delete('/:id', 
    authenticate, 
    validateFoodItemId,
    handleValidationErrors,
    deleteFoodItem
);

// ====================== AUTH ROUTE ======================
//     Simple Login
//     router.post('/login', foodController.login);

export default router;