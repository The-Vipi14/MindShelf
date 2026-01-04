// import User from "../models/User.model.js";
// import Book from "../models/Book.model.js";
// import Order from "../models/Order.model.js";

// /**
//  * @desc    Get admin dashboard stats
//  * @route   GET /api/admin/stats
//  */
// export const getDashboardStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments({ role: "user" });
//     const totalBooks = await Book.countDocuments();
//     const totalOrders = await Order.countDocuments();

//     const revenueAgg = await Order.aggregate([
//       { $group: { _id: null, total: { $sum: "$totalAmount" } } }
//     ]);

//     const totalRevenue = revenueAgg[0]?.total || 0;

//     const orderStatus = await Order.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     res.json({
//       totalUsers,
//       totalBooks,
//       totalOrders,
//       totalRevenue,
//       orderStatus
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch dashboard stats" });
//   }
// };



import User from "../models/User.model.js";
import Order from "../models/Order.model.js";
import Book from "../models/Book.model.js";

/**
 * =========================
 * USERS
 * =========================
 */

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Update user role
export const updateUserRole = async (req, res) => {
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role;
  await user.save();

  res.json(user);
};

/**
 * =========================
 * ORDERS
 * =========================
 */

// Get all orders
export const getAllOrdersAdmin = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.book", "title price");

  res.json(orders);
};

// Update order status
export const updateOrderStatusAdmin = async (req, res) => {
  const { status } = req.body;

  if (!["Placed", "Shipped", "Delivered", "Cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  await order.save();

  res.json(order);
};

/**
 * =========================
 * BOOKS
 * =========================
 */

// Get all books (admin view)
export const getAllBooksAdmin = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// Delete book
export const deleteBookAdmin = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  await book.deleteOne();
  res.json({ message: "Book deleted successfully" });
};
