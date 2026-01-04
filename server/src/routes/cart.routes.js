import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/", protect, updateCartItem);
router.delete("/:bookId", protect, removeCartItem);

export default router;
