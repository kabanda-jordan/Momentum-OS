import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
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
    targetDate: {
      type: Date,
      required: true,
      index: true
    },
    progress: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0
    },
    category: {
      type: String,
      default: "Personal",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
