import express from "express";
import { body } from "express-validator";
import {
  getCurrentUser,
  loginUser,
  registerUser
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 60 })
      .withMessage("Name must be between 2 and 60 characters."),
    body("email").trim().isEmail().withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long.")
      .isLength({ max: 128 })
      .withMessage("Password must be 128 characters or fewer."),
    validateRequest
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required."),
    validateRequest
  ],
  loginUser
);

router.get("/me", protect, getCurrentUser);

export default router;
