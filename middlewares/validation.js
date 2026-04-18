import { body, param, validationResult } from 'express-validator';

// For creating food item
export const validateCreateFoodItem = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Food name is required'),
    body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
    body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
];

//  For creating order
export const validateCreateOrder = [
    body('studentId')
    .isMongoId()
    .withMessage('Valid student ID is required'),
    body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
    body('items.*.foodItem')
    .isMongoId()
    .withMessage('Valid foodItem ID is required'),
    body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1')
];

//  For updating order status
export const validateUpdateOrderStatus = [
    body('status')
        .isIn(['Pending', 
            'Preparing', 
            'Ready', 
            'Completed', 
            'Cancelled'])
        .withMessage('Invalid order status')
];

//  For any route that uses /:id (get, update, delete food item)
export const validateFoodItemId = [
    param('id')
    .isMongoId()
    .withMessage('Invalid food item ID format')
];

// Validation for updating food item
export const validateUpdateFoodItem = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Food name cannot be empty if provided'),

    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number if provided'),

    body('category')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Category cannot be empty if provided')
        .isIn(['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks'])
        .withMessage('Invalid category'),

    body('available')
        .optional()
        .isBoolean()
        .withMessage('Available must be true or false')
];

// Validation for creating a new attendant (staff)
export const validateCreateAttendant = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Attendant name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),

    body('staffId')
        .trim()
        .notEmpty()
        .withMessage('Staff ID is required')
        .isLength({ min: 3 })
        .withMessage('Staff ID must be at least 3 characters')
];

// Validation for updating an attendant
export const validateUpdateAttendant = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Attendant name cannot be empty if provided')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),

    body('staffId')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Staff ID cannot be empty if provided')
        .isLength({ min: 3 })
        .withMessage('Staff ID must be at least 3 characters')
];

// ====================== CREATE STUDENT VALIDATION ======================
export const validateCreateStudent = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Student name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address'),

    body('studentId')
        .trim()
        .notEmpty()
        .withMessage('Student ID is required')
        .isLength({ min: 3 })
        .withMessage('Student ID must be at least 3 characters long')
];

// ====================== UPDATE STUDENT VALIDATION ======================
export const validateUpdateStudent = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Student name cannot be empty if provided')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address'),

    body('studentId')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Student ID cannot be empty if provided')
        .isLength({ min: 3 })
        .withMessage('Student ID must be at least 3 characters long')
];

// ====================== REGISTER VALIDATION ======================
export const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),

    body('staffId')
        .trim()
        .notEmpty()
        .withMessage('Staff ID is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Staff ID must be between 3 and 20 characters'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
];

// ====================== LOGIN VALIDATION ======================
export const validateLogin = [
    body('staffId')
        .trim()
        .notEmpty()
        .withMessage('Staff ID is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

//  Common error handler
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array()
        });
    }
    next();
};