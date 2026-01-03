import User from "../models/User.model.js";
import Book from "../models/Book.model.js";
import Order from "../models/Order.model.js";

/**
 * @desc    Get admin dashboard stats
 * @route   GET /api/admin/stats
 */
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalBooks = await Book.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    const orderStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalUsers,
      totalBooks,
      totalOrders,
      totalRevenue,
      orderStatus
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
