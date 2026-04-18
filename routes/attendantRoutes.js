import express from 'express';
import {
    createAttendant,
    getAllAttendant,
    getAttendantById,
    updateAttendant,
    deleteAttendant
} from '../controllers/attendantController.js';
import {authenticate} from '../middlewares/auth.js';
import {
    validateCreateAttendant,
    validateUpdateAttendant,
    handleValidationErrors
} from '../middlewares/validation.js';

const router = express.Router();

// Create a new attendant
router.post(
    '/', 
    authenticate, 
    validateCreateAttendant, 
    handleValidationErrors, 
    createAttendant
);

// Get all attendants
router.get(
    '/', 
    authenticate, 
    getAllAttendant
);

// Get attendant by id
router.get(
    '/:id', 
    authenticate, 
    getAttendantById
);

// Update an attendant
router.put(
    '/:id', 
    authenticate, 
    validateUpdateAttendant, 
    handleValidationErrors, 
    updateAttendant
);

// Delete an attendant
router.delete(
    '/:id', 
    authenticate, 
    deleteAttendant
);

export default router;