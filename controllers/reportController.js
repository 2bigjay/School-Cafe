import Order from '../models/Order.js';

export const getSalesReport = async (req, res) => {
   // overdue logic
    try {

        const today = new Date();
        today.setHours(0,0,0,0);

        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);

        const todayOrders = await Order.find({
        status: "Completed",
        createdAt: { $gte: today }
    });

        const weekOrders = await Order.find({
        status: "Completed",
        createdAt: { $gte: weekStart }
    });

    const todaySales = todayOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    const weekSales = weekOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.json({
      todaySales,
      weekSales
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
