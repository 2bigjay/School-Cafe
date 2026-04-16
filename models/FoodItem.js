import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    available: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem;