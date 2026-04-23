import express from "express";
import { body, param, query } from "express-validator";
import {
  createTask,
  deleteTask,
  getTaskStats,
  getTasks,
  updateTask
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

const taskValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 120 })
    .withMessage("Task title is required and must be 120 characters or fewer."),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description must be 2000 characters or fewer."),
  body("dueDate").isISO8601().withMessage("A valid due date is required."),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high."),
  body("tags")
    .optional()
    .isArray({ max: 10 })
    .withMessage("Tags must be an array with up to 10 items."),
  body("tags.*")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Each tag must be between 1 and 30 characters."),
  validateRequest
];

const taskQueryValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer."),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50."),
  query("status")
    .optional()
    .isIn(["active", "completed"])
    .withMessage("Status must be active or completed."),
  query("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high."),
  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search must be 100 characters or fewer."),
  query("sortBy")
    .optional()
    .isIn(["dueDate", "title", "createdAt", "updatedAt", "completed"])
    .withMessage("Invalid task sort field."),
  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort order must be asc or desc."),
  validateRequest
];

const taskIdValidation = [param("id").isMongoId().withMessage("Invalid task id."), validateRequest];

router.use(protect);

router.get("/", taskQueryValidation, getTasks);
router.get("/stats", getTaskStats);
router.post("/", taskValidation, createTask);
router.put(
  "/:id",
  [
    ...taskIdValidation,
    body("title")
      .optional()
      .trim()
      .isLength({ min: 1, max: 120 })
      .withMessage("Task title must be between 1 and 120 characters."),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage("Description must be 2000 characters or fewer."),
    body("dueDate").optional().isISO8601().withMessage("A valid due date is required."),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Priority must be low, medium, or high."),
    body("completed").optional().isBoolean().withMessage("Completed must be a boolean."),
    body("tags")
      .optional()
      .isArray({ max: 10 })
      .withMessage("Tags must be an array with up to 10 items."),
    body("tags.*")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 1, max: 30 })
      .withMessage("Each tag must be between 1 and 30 characters."),
    validateRequest
  ],
  updateTask
);
router.delete("/:id", taskIdValidation, deleteTask);

export default router;
