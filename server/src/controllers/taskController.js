import mongoose from "mongoose";
import Task from "../models/Task.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeTags = (tags) => {
  if (!Array.isArray(tags)) {
    return [];
  }

  return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
};

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const normalizeTaskPayload = (payload) => {
  const normalizedPayload = {};

  if (hasOwn(payload, "title")) {
    normalizedPayload.title = payload.title?.trim();
  }

  if (hasOwn(payload, "description")) {
    normalizedPayload.description = payload.description?.trim() || "";
  }

  if (hasOwn(payload, "priority")) {
    normalizedPayload.priority = payload.priority;
  }

  if (hasOwn(payload, "dueDate")) {
    normalizedPayload.dueDate = payload.dueDate ? new Date(payload.dueDate) : undefined;
  }

  if (hasOwn(payload, "tags")) {
    normalizedPayload.tags = normalizeTags(payload.tags);
  }

  if (typeof payload.completed === "boolean") {
    normalizedPayload.completed = payload.completed;
    normalizedPayload.completedAt = payload.completed ? new Date() : undefined;
  }

  return Object.fromEntries(
    Object.entries(normalizedPayload).filter(([, value]) => value !== undefined)
  );
};

const buildTaskQuery = (userId, query) => {
  const filters = { user: userId };

  if (query.status === "completed") {
    filters.completed = true;
  }

  if (query.status === "active") {
    filters.completed = false;
  }

  if (query.priority) {
    filters.priority = query.priority;
  }

  if (query.search) {
    const searchPattern = escapeRegex(query.search.trim());

    filters.$or = [
      { title: { $regex: searchPattern, $options: "i" } },
      { description: { $regex: searchPattern, $options: "i" } },
      { tags: { $elemMatch: { $regex: searchPattern, $options: "i" } } }
    ];
  }

  return filters;
};

const buildTaskSort = ({ sortBy = "dueDate", sortOrder = "asc" }) => {
  const direction = sortOrder === "desc" ? -1 : 1;

  switch (sortBy) {
    case "title":
      return { title: direction, createdAt: -1 };
    case "createdAt":
      return { createdAt: direction };
    case "updatedAt":
      return { updatedAt: direction };
    case "completed":
      return { completed: direction, dueDate: 1 };
    case "dueDate":
    default:
      return { completed: 1, dueDate: direction, createdAt: -1 };
  }
};

export const getTasks = asyncHandler(async (req, res) => {
  const page = Number.parseInt(req.query.page, 10) || 1;
  const limit = Number.parseInt(req.query.limit, 10) || 6;
  const filters = buildTaskQuery(req.user._id, req.query);

  const [items, totalItems] = await Promise.all([
    Task.find(filters)
      .sort(buildTaskSort(req.query))
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Task.countDocuments(filters)
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

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    ...normalizeTaskPayload(req.body),
    user: req.user._id
  });

  res.status(201).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found.");
  }

  Object.assign(task, normalizeTaskPayload(req.body));

  const updatedTask = await task.save();
  res.json(updatedTask);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found.");
  }

  res.json({ message: "Task deleted successfully." });
});

export const getTaskStats = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - 6);

  const weeklyProductivity = await Task.aggregate([
    {
      $match: {
        user: userId,
        completed: true,
        completedAt: { $gte: startOfWeek }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$completedAt",
            timezone: "UTC"
          }
        },
        completedTasks: { $sum: 1 }
      }
    }
  ]);

  const countsByDate = new Map(
    weeklyProductivity.map((entry) => [entry._id, entry.completedTasks])
  );

  const fullWeek = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    const key = date.toISOString().slice(0, 10);

    return {
      date: key,
      completedTasks: countsByDate.get(key) || 0
    };
  });

  res.json(fullWeek);
});
