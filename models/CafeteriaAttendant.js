import mongoose from 'momgooose';

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
    }
});

const CafeteriaAttendant = mongoose.model('CafeteriaAttendant', CafeteriaAttendantSchema);
export default CafeteriaAttendant;