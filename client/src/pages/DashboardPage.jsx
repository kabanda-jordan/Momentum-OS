import { useEffect, useMemo, useState } from "react";
import apiClient from "../api/apiClient";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import DashboardCharts from "../components/DashboardCharts";
import TaskList from "../components/TaskList";
import GoalList from "../components/GoalList";
import ReminderList from "../components/ReminderList";
import TaskForm from "../components/TaskForm";
import GoalForm from "../components/GoalForm";
import Card from "../components/Card";

const defaultFilters = {
  search: "",
  status: "all",
  priority: "",
  sortBy: "dueDate",
  sortOrder: "asc",
  page: 1
};

const DashboardPage = () => {
  const [overview, setOverview] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [tasksPagination, setTasksPagination] = useState(null);
  const [goalsPagination, setGoalsPagination] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [goalSort, setGoalSort] = useState({
    sortBy: "targetDate",
    sortOrder: "asc",
    page: 1
  });
  const [taskDraft, setTaskDraft] = useState(null);
  const [goalDraft, setGoalDraft] = useState(null);
  const [savingTask, setSavingTask] = useState(false);
  const [savingGoal, setSavingGoal] = useState(false);
  const [pageError, setPageError] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    typeof Notification !== "undefined" && Notification.permission === "granted"
  );

  const loadDashboard = async () => {
    try {
      setPageError("");

      const [overviewResponse, tasksResponse, goalsResponse] = await Promise.all([
        apiClient.get("/dashboard"),
        apiClient.get("/tasks", {
          params: {
            search: filters.search || undefined,
            status: filters.status !== "all" ? filters.status : undefined,
            priority: filters.priority || undefined,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
            page: filters.page,
            limit: 6
          }
        }),
        apiClient.get("/goals", {
          params: {
            sortBy: goalSort.sortBy,
            sortOrder: goalSort.sortOrder,
            page: goalSort.page,
            limit: 4
          }
        })
      ]);

      setOverview(overviewResponse.data);
      setTasks(tasksResponse.data.items);
      setGoals(goalsResponse.data.items);
      setTasksPagination(tasksResponse.data.pagination);
      setGoalsPagination(goalsResponse.data.pagination);
    } catch (error) {
      setPageError(error.response?.data?.message || "We couldn't load the dashboard right now.");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [
    filters.search,
    filters.status,
    filters.priority,
    filters.sortBy,
    filters.sortOrder,
    filters.page,
    goalSort.sortBy,
    goalSort.sortOrder,
    goalSort.page
  ]);

  useEffect(() => {
    if (
      typeof Notification === "undefined" ||
      !overview?.reminders?.length ||
      Notification.permission !== "granted"
    ) {
      return;
    }

    overview.reminders.slice(0, 2).forEach((reminder) => {
      new Notification("Productivity reminder", {
        body: reminder.message
      });
    });
  }, [overview]);

  const handleTaskSubmit = async (payload) => {
    setSavingTask(true);

    try {
      setPageError("");

      if (taskDraft?._id) {
        await apiClient.put(`/tasks/${taskDraft._id}`, payload);
      } else {
        await apiClient.post("/tasks", payload);
      }

      setTaskDraft(null);
      await loadDashboard();
    } catch (error) {
      setPageError(error.response?.data?.message || "We couldn't save that task.");
    } finally {
      setSavingTask(false);
    }
  };

  const handleGoalSubmit = async (payload) => {
    setSavingGoal(true);

    try {
      setPageError("");

      if (goalDraft?._id) {
        await apiClient.put(`/goals/${goalDraft._id}`, payload);
      } else {
        await apiClient.post("/goals", payload);
      }

      setGoalDraft(null);
      await loadDashboard();
    } catch (error) {
      setPageError(error.response?.data?.message || "We couldn't save that goal.");
    } finally {
      setSavingGoal(false);
    }
  };

  const stats = useMemo(() => overview?.stats || {}, [overview]);

  const enableNotifications = async () => {
    if (typeof Notification === "undefined") {
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationsEnabled(permission === "granted");
  };

  if (!overview) {
    return (
      <DashboardLayout>
        <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 text-sm text-slate-500 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
          Loading your workspace...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total tasks" value={stats.totalTasks} helper="Everything currently in motion" />
        <StatCard label="Completion rate" value={`${stats.completionRate}%`} helper="Closed loops this cycle" />
        <StatCard label="Active goals" value={stats.totalGoals} helper="Focused milestones in progress" />
        <StatCard label="Average goal progress" value={`${stats.averageGoalProgress}%`} helper="Across all tracked goals" />
      </div>

      {pageError ? (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
          {pageError}
        </div>
      ) : null}

      <DashboardCharts
        weeklyProductivity={overview.charts.weeklyProductivity}
        goalProgress={overview.charts.goalProgress}
      />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-6">
          <Card title={taskDraft ? "Edit task" : "New task"} subtitle="Capture work with priority, due date, and tags.">
            <TaskForm
              initialValues={taskDraft}
              onSubmit={handleTaskSubmit}
              onCancel={taskDraft ? () => setTaskDraft(null) : undefined}
              submitting={savingTask}
            />
          </Card>
          <TaskList
            tasks={tasks}
            pagination={tasksPagination}
            filters={filters}
            onFilterChange={(key, value) =>
              setFilters((current) => ({
                ...current,
                [key]: value,
                page: key === "page" ? value : 1
              }))
            }
            onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
            onToggleComplete={(task, completed) =>
              apiClient
                .put(`/tasks/${task._id}`, { ...task, completed })
                .then(loadDashboard)
                .catch((error) =>
                  setPageError(error.response?.data?.message || "We couldn't update that task.")
                )
            }
            onEdit={setTaskDraft}
            onDelete={(taskId) =>
              apiClient
                .delete(`/tasks/${taskId}`)
                .then(loadDashboard)
                .catch((error) =>
                  setPageError(error.response?.data?.message || "We couldn't delete that task.")
                )
            }
          />
        </div>

        <div className="space-y-6">
          <Card title={goalDraft ? "Edit goal" : "New goal"} subtitle="Turn bigger ambitions into measurable progress.">
            <GoalForm
              initialValues={goalDraft}
              onSubmit={handleGoalSubmit}
              onCancel={goalDraft ? () => setGoalDraft(null) : undefined}
              submitting={savingGoal}
            />
          </Card>
          <GoalList
            goals={goals}
            pagination={goalsPagination}
            sort={goalSort}
            onSortChange={(key, value) =>
              setGoalSort((current) => ({
                ...current,
                [key]: value,
                page: key === "page" ? value : 1
              }))
            }
            onPageChange={(page) => setGoalSort((current) => ({ ...current, page }))}
            onEdit={setGoalDraft}
            onDelete={(goalId) =>
              apiClient
                .delete(`/goals/${goalId}`)
                .then(loadDashboard)
                .catch((error) =>
                  setPageError(error.response?.data?.message || "We couldn't delete that goal.")
                )
            }
          />
          <ReminderList
            reminders={overview.reminders}
            notificationsEnabled={notificationsEnabled}
            onEnableNotifications={enableNotifications}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
