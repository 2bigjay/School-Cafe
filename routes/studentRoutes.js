import expres from 'express';
import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} from '../controllers/studentController.js';
import {authenticate} from '../middlewares/auth.js';
import {
    validateCreateStudent,
    validateUpdateStudent,
    handleValidationErrors
} from '../middlewares/validation.js';

const router = expres.Router();

// Create a new student
router.post('/',
    validateCreateStudent,
    handleValidationErrors,
    createStudent
);

// Get all students
router.get('/',
    authenticate,
    getAllStudents
);

// Get students by id
router.get('/:id',
    authenticate,
    getStudentById
);

router.put('/:id', 
    authenticate,
    validateUpdateStudent,
    handleValidationErrors,
    updateStudent
);

router.delete('/:id',
    authenticate,
    deleteStudent
);

export default router;