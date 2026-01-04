// import express from "express";
// import {
//   createOrder,
//   createOrderFromCart,
//   getMyOrders,
//   getAllOrders,
//   updateOrderStatus
// } from "../controllers/order.controller.js";

// import { protect, adminOnly } from "../middleware/auth.middleware.js";

// const router = express.Router();

// /**
//  * ======================
//  * USER ROUTES
//  * ======================
//  */

// // Create order directly (without cart – optional future use)
// router.post("/", protect, createOrder);

// // Create order from cart
// router.post("/from-cart", protect, createOrderFromCart);

// // Get logged-in user's orders
// router.get("/my", protect, getMyOrders);


// /**
//  * ======================
//  * ADMIN ROUTES
//  * ======================
//  */

// // Get all orders
// router.get("/", protect, adminOnly, getAllOrders);

// // Update order status
// router.put("/:id/status", protect, adminOnly, updateOrderStatus);

// export default router;


import express from "express";
import {
  createOrderFromCart,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/order.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * USER ROUTES
 */
router.post("/from-cart", protect, createOrderFromCart);
router.get("/my", protect, getMyOrders);

/**
 * ADMIN ROUTES
 */
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
