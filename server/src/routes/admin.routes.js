import express from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin dashboard stats
router.get("/stats", protect, adminOnly, getDashboardStats);

export default router;
