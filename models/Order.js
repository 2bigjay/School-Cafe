import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem'
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            'Pending',
            'In Progress',
            'Ready',
            'Completed', 
            'Cancelled'
        ],
        default: 'Pending'
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CafeteriaAttendant'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    readyTime: {
        type: Date,
        default: null
    }
})

const Order = mongoose.model('Order', OrderSchema);
export default Order;