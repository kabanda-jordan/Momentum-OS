import Goal from "../models/Goal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const normalizeGoalPayload = (payload) => {
  const normalizedPayload = {};

  if (hasOwn(payload, "title")) {
    normalizedPayload.title = payload.title?.trim();
  }

  if (hasOwn(payload, "description")) {
    normalizedPayload.description = payload.description?.trim() || "";
  }

  if (hasOwn(payload, "category")) {
    normalizedPayload.category = payload.category?.trim();
  }

  if (hasOwn(payload, "targetDate")) {
    normalizedPayload.targetDate = payload.targetDate ? new Date(payload.targetDate) : undefined;
  }

  if (typeof payload.progress === "number") {
    normalizedPayload.progress = payload.progress;
  }

  return normalizedPayload;
};

const buildGoalSort = ({ sortBy = "targetDate", sortOrder = "asc" }) => {
  const direction = sortOrder === "desc" ? -1 : 1;

  switch (sortBy) {
    case "title":
      return { title: direction, createdAt: -1 };
    case "progress":
      return { progress: direction, targetDate: 1 };
    case "createdAt":
      return { createdAt: direction };
    case "updatedAt":
      return { updatedAt: direction };
    case "targetDate":
    default:
      return { targetDate: direction, createdAt: -1 };
  }
};

export const getGoals = asyncHandler(async (req, res) => {
  const page = Number.parseInt(req.query.page, 10) || 1;
  const limit = Number.parseInt(req.query.limit, 10) || 4;
  const filters = { user: req.user._id };

  const [items, totalItems] = await Promise.all([
    Goal.find(filters)
      .sort(buildGoalSort(req.query))
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Goal.countDocuments(filters)
  ]);

  res.json({
    items,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.max(1, Math.ceil(totalItems / limit))
    }
  });
});

export const createGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.create({
    ...normalizeGoalPayload(req.body),
    user: req.user._id
  });

  res.status(201).json(goal);
});

export const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found.");
  }

  Object.assign(goal, normalizeGoalPayload(req.body));
  const updatedGoal = await goal.save();
  res.json(updatedGoal);
});

export const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found.");
  }

  res.json({ message: "Goal deleted successfully." });
});
