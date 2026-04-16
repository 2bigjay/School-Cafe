import student from '../models/student.js';

// Create a new student
export const createStudent = async (req, res) => {;
    try {
        const student = await student.create(req.body);

        res.status(201).json(student);

    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        })
    }
};

// Get All Students
export const getAllStudents = async (req, res) => {
    try{
        const students = await student.find();
        res.json(students);

        if (!students) {
            return res.status(404).json({
                message: 'Students not found'
            });
        }

    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        })
    }
};

//Get students by id
export const getStudentById = async (req, res) => {
    try{
        const student = await student.findById(req.params.id)
         if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
         }
         res.json(student);
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        });
    }
};

// Update a student
export const updateStudent = async (req, res) => {
    try {
        const student = await student.findByIdAndUpdate(req.params.id, req.body)

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        });

    }
};

// Delete a student
export const deleteStudent = async (req, res) => {
    try{
        const student = await student.findByIdAndDelete(req.params.id)

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        });
    }
};

