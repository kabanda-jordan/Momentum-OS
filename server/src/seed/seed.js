import dotenv from "dotenv";
import { connectDatabase } from "../config/db.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import Goal from "../models/Goal.js";
import { sampleGoals, sampleTasks, sampleUser } from "./sampleData.js";

dotenv.config();

await connectDatabase();

await Promise.all([User.deleteMany(), Task.deleteMany(), Goal.deleteMany()]);

// Create a single demo user, then attach related sample documents for a ready-to-use dashboard.
const user = await User.create(sampleUser);

await Task.insertMany(
  sampleTasks.map((task) => ({
    ...task,
    user: user._id
  }))
);

await Goal.insertMany(
  sampleGoals.map((goal) => ({
    ...goal,
    user: user._id
  }))
);

console.log("Database seeded successfully.");
process.exit(0);
