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

//====================== Public Routes =========================
// Login
router.post('/login', login);