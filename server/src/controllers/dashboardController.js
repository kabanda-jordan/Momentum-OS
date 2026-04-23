import Task from "../models/Task.js";
import Goal from "../models/Goal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isUpcoming = (date, days = 3) => {
  const today = new Date();
  const target = new Date(date);
  const difference = target.getTime() - today.getTime();
  return difference >= 0 && difference <= days * 24 * 60 * 60 * 1000;
};

export const getDashboardOverview = asyncHandler(async (req, res) => {
  const [tasks, goals] = await Promise.all([
    Task.find({ user: req.user._id }).sort({ dueDate: 1 }).lean(),
    Goal.find({ user: req.user._id }).sort({ targetDate: 1 }).lean()
  ]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const overdueTasks = tasks.filter(
    (task) => !task.completed && new Date(task.dueDate) < new Date()
  ).length;

  // Merge task and goal deadlines into a single lightweight reminder feed for the UI.
  const reminders = [
    ...tasks
      .filter((task) => !task.completed && isUpcoming(task.dueDate))
      .map((task) => ({
        id: task._id,
        type: "task",
        title: task.title,
        dueDate: task.dueDate,
        message: `Task due soon: ${task.title}`
      })),
    ...goals
      .filter((goal) => goal.progress < 100 && isUpcoming(goal.targetDate, 7))
      .map((goal) => ({
        id: goal._id,
        type: "goal",
        title: goal.title,
        dueDate: goal.targetDate,
        message: `Goal deadline approaching: ${goal.title}`
      }))
  ].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const weeklyCounts = Array.from({ length: 7 }, (_, index) => {
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    current.setDate(current.getDate() - (6 - index));

    const label = current.toLocaleDateString("en-US", { weekday: "short" });
    const count = tasks.filter((task) => {
      if (!task.completedAt) {
        return false;
      }

      const completedAt = new Date(task.completedAt);
      completedAt.setHours(0, 0, 0, 0);
      return completedAt.getTime() === current.getTime();
    }).length;

    return { day: label, completed: count };
  });

  res.json({
    stats: {
      totalTasks: tasks.length,
      completedTasks,
      activeTasks: tasks.length - completedTasks,
      completionRate: tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0,
      totalGoals: goals.length,
      averageGoalProgress: goals.length
        ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
        : 0,
      overdueTasks
    },
    charts: {
      weeklyProductivity: weeklyCounts,
      goalProgress: goals.map((goal) => ({
        name: goal.title,
        progress: goal.progress
      }))
    },
    reminders
  });
});
