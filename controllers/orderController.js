import Order from '../models/Order.js';
import jwt from 'jsonwebtoken';
import FoodItem from '../models/FoodItem.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const {studentId, items, attndantId} = req.body

        let totalPrice = 0;

        for (const itemId of items) {
            const foodItem = await FoodItem.findById(itemId);
            if (!foodItem) {
                return res.status(404).json({
                    message: `Food item with ID ${itemId} not found`
                })
            }
                    
                // Check if the food is available
            if (!foodItem.available) {
                return res.status(400).json({
                    message: `Food item ${foodItem.name} is currently unavailable`
                })
            }

            totalPrice += foodItem.price * itemId.quantity;

            // Create the Order
            const order = new Order({
                studentId,
                items,
                attndantId,
                totalPrice,
                status: "Pending",
                orderDate: Date.now()
            });

            // Save order
            await order.save();

            // Populate date
            const populatedOrder = await Order.findById(order._id)
                .populate('studentId', 'name')
                .populate('items', 'name price')
                .populate('attndantId', 'name');

            res.status(201).json({
                message: 'Order created successfully',
                order: populatedOrder
            });
                
    }
}catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try{
            const { page = 1, limit = 10, search = "" } = req.query;

            let query = {};

            if (search){
                query.$or = [
                    { studentId: { $regex: search, $options: 'i' } },
                    { status: { $regex: search, $options: 'i' } }
                ];
            }

            const skip = (page - 1) * limit;

            const orders = await Order.findById(query)
                .populate('studentId', 'name')
                .populate('items.foodItems')
                .populate('orderedByAttendant')
                
            res.json({
                message: 'Food Items fetched successfully',
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalItems / limit),
                    totalItems,
                    limit: parseInt(limit)
                },
                orders
            })
    }catch (err) {
        res.status(500).json({ error: 'Server error'});
        }
};

// Get a specific order by ID
export const getAllOrdersById = async (req, res) => {
    try {
            const order = await Order.findById(req.params.id)
                .populate('studentId', 'name')
                .populate('items.foodItems')
                .populate('orderedByAttendant', 'name');

            if (!order) {
                return res.status(404).json ({
                    message: 'Order not found', 
                });
            }
            res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id,
             { status }, 
             { new: true });

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.json({
            message: 'Order status updated successfully',
            order
        });

        if (status === 'Ready'){
            order.readyTime = new Date();
        }

        // Update status
        order.status = status;

        // Save the updated order
        await order.save();

        const updatedOrder = await Order.findById(order._id)
            .populate('studentId', 'name')
            .populate('items.foodItems')
            .populate('orderedByAttendant', 'name');

        res.status(200).json({
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (err) {
        res.status(500).json ({
            error: 'Server error'
        })
    }
};

export const cancleOrder = async (req,res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        if (order.status === 'Completed') {
            return res.status(400).json({
                message: 'Completed orders cannot be cancelled'
            });
        }

        order.status = 'Cancelled';
        await order.save();

        res.status(200).json({
            message: 'Order cancelled successfully'
        });
    } catch (err) {
        res.status(500).json ({
            error: 'Server error'
        })
    }
};
    
export const getOverdueOrders = async (req, res) => {
    try {
        const now = new Date();

        const overdueOrders = await Order.find({
            status: "Ready",
            readyTime: { $lt: now }     // readyTime is in the past
        })
        .populate('student')
        .populate('items.foodItem')
        .populate('orderedByAttendant');

        res.json({
            message: "Overdue orders fetched",
            count: overdueOrders.length,
            overdueOrders
        });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
