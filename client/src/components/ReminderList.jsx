import { BellRing } from "lucide-react";
import Card from "./Card";
import { formatDate } from "../utils/formatters";

const ReminderList = ({ reminders, notificationsEnabled, onEnableNotifications }) => (
  <Card
    title="Reminders"
    subtitle="Upcoming deadlines and nudges to keep momentum up."
    action={
      !notificationsEnabled ? (
        <button
          type="button"
          onClick={onEnableNotifications}
          className="text-sm font-medium text-cyan-600 dark:text-cyan-300"
        >
          Enable browser alerts
        </button>
      ) : null
    }
  >
    <div className="space-y-3">
      {reminders.length ? (
        reminders.map((reminder) => (
          <div
            key={`${reminder.type}-${reminder.id}`}
            className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60"
          >
            <div className="rounded-2xl bg-cyan-500/10 p-2 text-cyan-600 dark:text-cyan-200">
              <BellRing size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{reminder.message}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Due {formatDate(reminder.dueDate)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          You're clear for now. No urgent reminders in the next few days.
        </div>
      )}
    </div>
  </Card>
);

export default ReminderList;
