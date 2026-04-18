import mongoose from 'mongoose';

const CafeteriaAttendantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    staffId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    }
});

const CafeteriaAttendant = mongoose.model('CafeteriaAttendant', CafeteriaAttendantSchema);
export default CafeteriaAttendant;