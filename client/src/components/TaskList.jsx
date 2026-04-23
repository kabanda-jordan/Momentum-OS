import { Pencil, Search, Trash2 } from "lucide-react";
import Card from "./Card";
import Button from "./Button";
import { formatDate } from "../utils/formatters";

const priorityStyles = {
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  high: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"
};

const TaskList = ({
  tasks,
  pagination,
  filters,
  onFilterChange,
  onPageChange,
  onToggleComplete,
  onEdit,
  onDelete
}) => (
  <Card
    title="Tasks"
    subtitle="Search, filter, and stay on top of what matters most."
    action={
      <div className="flex items-center gap-2">
        <select
          value={filters.sortBy}
          onChange={(event) => onFilterChange("sortBy", event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="dueDate">Sort by due date</option>
          <option value="updatedAt">Sort by recent activity</option>
          <option value="title">Sort by title</option>
          <option value="completed">Sort by completion</option>
        </select>
        <select
          value={filters.sortOrder}
          onChange={(event) => onFilterChange("sortOrder", event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    }
  >
    <div className="mb-5 grid gap-3 md:grid-cols-[1.8fr_repeat(2,1fr)]">
      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input
          value={filters.search}
          onChange={(event) => onFilterChange("search", event.target.value)}
          className="w-full bg-transparent text-sm text-slate-700 outline-none dark:text-slate-200"
          placeholder="Search tasks or tags"
        />
      </label>
      <select
        value={filters.status}
        onChange={(event) => onFilterChange("status", event.target.value)}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={filters.priority}
        onChange={(event) => onFilterChange("priority", event.target.value)}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      >
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <div className="space-y-3">
      {tasks.length ? (
        tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(event) => onToggleComplete(task, event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-400"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-base font-medium ${
                        task.completed
                          ? "text-slate-400 line-through dark:text-slate-500"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{task.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400 dark:text-slate-500">
                    <span>Due {formatDate(task.dueDate)}</span>
                    {task.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-200 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" type="button" onClick={() => onEdit(task)}>
                  <Pencil size={16} />
                </Button>
                <Button variant="ghost" type="button" onClick={() => onDelete(task._id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No tasks match the current filters.
        </div>
      )}
    </div>

    {pagination ? (
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>
          Page {pagination.page} of {pagination.totalPages} · {pagination.totalItems} tasks
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            type="button"
            disabled={pagination.page <= 1}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            type="button"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => onPageChange(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    ) : null}
  </Card>
);

export default TaskList;
