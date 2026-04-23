import express from "express";
import { getDashboardOverview } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDashboardOverview);

export default router;
