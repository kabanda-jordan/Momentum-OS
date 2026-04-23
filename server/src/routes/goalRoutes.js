import express from "express";
import { body, param, query } from "express-validator";
import {
  createGoal,
  deleteGoal,
  getGoals,
  updateGoal
} from "../controllers/goalController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

const goalValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 120 })
    .withMessage("Goal title is required and must be 120 characters or fewer."),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description must be 2000 characters or fewer."),
  body("targetDate").isISO8601().withMessage("A valid target date is required."),
  body("progress")
    .isInt({ min: 0, max: 100 })
    .withMessage("Progress must be between 0 and 100."),
  body("category")
    .optional()
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage("Category must be between 1 and 60 characters."),
  validateRequest
];

const goalIdValidation = [param("id").isMongoId().withMessage("Invalid goal id."), validateRequest];
const goalQueryValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer."),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50."),
  query("sortBy")
    .optional()
    .isIn(["targetDate", "title", "progress", "createdAt", "updatedAt"])
    .withMessage("Invalid goal sort field."),
  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort order must be asc or desc."),
  validateRequest
];

router.use(protect);

router.get("/", goalQueryValidation, getGoals);
router.post("/", goalValidation, createGoal);
router.put(
  "/:id",
  [
    ...goalIdValidation,
    body("title")
      .optional()
      .trim()
      .isLength({ min: 1, max: 120 })
      .withMessage("Goal title must be between 1 and 120 characters."),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage("Description must be 2000 characters or fewer."),
    body("targetDate").optional().isISO8601().withMessage("A valid target date is required."),
    body("progress")
      .optional()
      .isInt({ min: 0, max: 100 })
      .withMessage("Progress must be between 0 and 100."),
    body("category")
      .optional()
      .trim()
      .isLength({ min: 1, max: 60 })
      .withMessage("Category must be between 1 and 60 characters."),
    validateRequest
  ],
  updateGoal
);
router.delete("/:id", goalIdValidation, deleteGoal);

export default router;
