// import express from "express";
// import { getDashboardStats } from "../controllers/admin.controller.js";
// import { protect, adminOnly } from "../middleware/auth.middleware.js";

// const router = express.Router();

// // Admin dashboard stats
// router.get("/stats", protect, adminOnly, getDashboardStats);

// export default router;


import express from "express";
import {
  getAllUsers,
  updateUserRole,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  getAllBooksAdmin,
  deleteBookAdmin
} from "../controllers/admin.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * =========================
 * USERS
 * =========================
 */
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/role", protect, adminOnly, updateUserRole);

/**
 * =========================
 * ORDERS
 * =========================
 */
router.get("/orders", protect, adminOnly, getAllOrdersAdmin);
router.put("/orders/:id/status", protect, adminOnly, updateOrderStatusAdmin);

/**
 * =========================
 * BOOKS
 * =========================
 */
router.get("/books", protect, adminOnly, getAllBooksAdmin);
router.delete("/books/:id", protect, adminOnly, deleteBookAdmin);

export default router;
