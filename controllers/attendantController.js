import CafeteraiAttendant from '../models/CafeteriaAttendant';

//Create a new attendant
export const createAttendant = async (req, res) => {
    try {
        const attendant = await CafeteriaAttendant.create(req.body);

        req.status(201).json(attendant);
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        });
    }
};

//Get all attendants
export const getAllAtendant = async (rq, res) => {
    try {
        const attendants = await CafeteriaAttendant.find();
        res.status(attendants);

        if (!attendants) {
            return res.status(404).json({
                message: 'Attendants not found'
            });       
        }
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        }); 
    }
};

// Get attendant by id
export const getAttendantById = async (req, res) => {
    try {
        const attendant = await CafeteriaAttendant.findById(req.params.id);
        
        if (!attendant) {
            return res.status(404).json({
                message: 'Attendant not found'
            });
        }
        res.status(200).json(attendant);
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        });
    }
};

// Update an attendant
export const updateAttendant = async (req, res) => {
    try { 
        const attendant = await CafeteriaAttendant.findByIdAndUpdate(req.params.id, req.body);

        if (!attendant) {
            return res.status(404).json({
                message: 'Attendant not found'
            });
        }
        res.status(200).json(attendant);
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        });
    }
};

// Delete an attendant
export const deleteAttendant = async (req, res) => {
    try {
        const attendant = await CafeteriaAttendant.findByIdAndDelete(req.params.id);

        if (!attendant) {
            return res.status(404).json({
                message: 'Attendant not found'
            });
        }
        res.status(200).json({
            message: 'Attendant deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            error: 'Server error'
        });
    }
};
