export const sampleUser = {
  name: "Demo User",
  email: "demo@example.com",
  password: "password123"
};

export const sampleTasks = [
  {
    title: "Plan weekly priorities",
    description: "Review calendar, backlog, and key outcomes for the week.",
    priority: "high",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    tags: ["planning", "weekly"],
    completed: false
  },
  {
    title: "Complete deep work session",
    description: "Finish the dashboard wireframes and document implementation notes.",
    priority: "medium",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    tags: ["design", "focus"],
    completed: true,
    completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    title: "Inbox zero sprint",
    description: "Respond to pending emails and archive low-priority threads.",
    priority: "low",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    tags: ["admin"],
    completed: false
  }
];

export const sampleGoals = [
  {
    title: "Launch personal portfolio refresh",
    description: "Ship a refined portfolio with updated case studies.",
    targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    progress: 65,
    category: "Career"
  },
  {
    title: "Read 12 books this year",
    description: "Keep momentum with a steady monthly reading habit.",
    targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    progress: 42,
    category: "Personal Growth"
  }
];
