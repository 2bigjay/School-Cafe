import express from 'express'
import {
    validateRegister,
    validateLogin,
    handleValidationErrors
} from '../middlewares/validation.js'
import {register, login} from '../controllers/authController.js';
const router = express.Router();

// register new staff
router.post("/register", validateRegister, handleValidationErrors, register);

// login staff
router.post("/login", validateLogin, handleValidationErrors, login);

export default router