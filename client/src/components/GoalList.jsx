import { Pencil, Trash2 } from "lucide-react";
import Card from "./Card";
import Button from "./Button";
import { formatDate, getDaysRemaining } from "../utils/formatters";

const GoalList = ({ goals, pagination, sort, onSortChange, onPageChange, onEdit, onDelete }) => (
  <Card
    title="Goals"
    subtitle="Track long-term momentum without losing sight of deadlines."
    action={
      <div className="flex items-center gap-2">
        <select
          value={sort.sortBy}
          onChange={(event) => onSortChange("sortBy", event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="targetDate">Sort by target date</option>
          <option value="progress">Sort by progress</option>
          <option value="updatedAt">Sort by recent activity</option>
          <option value="title">Sort by title</option>
        </select>
        <select
          value={sort.sortOrder}
          onChange={(event) => onSortChange("sortOrder", event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    }
  >
    <div className="space-y-4">
      {goals.length ? (
        goals.map((goal) => {
          const daysRemaining = getDaysRemaining(goal.targetDate);

          return (
            <div
              key={goal._id}
              className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-medium text-slate-900 dark:text-white">{goal.title}</h3>
                    <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-200">
                      {goal.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{goal.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" type="button" onClick={() => onEdit(goal)}>
                    <Pencil size={16} />
                  </Button>
                  <Button variant="ghost" type="button" onClick={() => onDelete(goal._id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Deadline {formatDate(goal.targetDate)}</span>
                <span>{daysRemaining >= 0 ? `${daysRemaining} days left` : "Past due"}</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                {goal.progress}% complete
              </p>
            </div>
          );
        })
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No goals yet. Start with one measurable milestone.
        </div>
      )}
    </div>

    {pagination ? (
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>
          Page {pagination.page} of {pagination.totalPages} · {pagination.totalItems} goals
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

export default GoalList;
