import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    dueDate: {
      type: Date,
      required: true,
      index: true
    },
    tags: {
      type: [String],
      default: []
    },
    completed: {
      type: Boolean,
      default: false,
      index: true
    },
    completedAt: Date
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
