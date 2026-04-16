import FoodItem from '../models/FoodItem.js';
import jwt from 'jsonwebtoken';

// Create a new food item
export const createFoodItem = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const foodItem = new FoodItem({ name, description, price, category });
        await foodItem.save();
        res.status(201).json(foodItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating food item', error });
    }
};

// Get all food items
export const getAllFoodItems = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', available } = req.query;

        let query = {};

        // Available filter 
        if (available !== undefined) {
            query.available = available.toLowerCase() === 'true';
        }

        // Search filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const foodItems = await FoodItem.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalItems = await FoodItem.countDocuments(query);

        res.json({
            message: "Food items fetched successfully",
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit: parseInt(limit)
            },
            foodItems
        });

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Food By Id
export const getFoodItemById = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found'});
        }
        res.json(foodItem);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a food item
export const updateFoodItem = async (req, res) => {
    try {
        const { name, description, price, category, available } = req.body;
        const foodItem = await FoodItem.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, available },
            { new: true }
        );
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.json(foodItem);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a food item
export const deleteFoodItem = async (req, res) => {
    try {
        const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.json({ message: 'Food item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
